import { useState, useEffect } from 'react'
import Avatar from '../../Avatar'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

import LikeButton from '../../LikeButton'
import CommentMenu from './CommentMenu'
import { likeComment, unLikeComment, updateComment } from '../../../redux/actions/commentAction'

const CommentCard = ({ comment, post }) => {
	const { auth } = useSelector((state) => state)
	const dispatch = useDispatch()

	const [content, setContent] = useState('')
	const [readMore, setReadMore] = useState(false)

	const [onEdit, setOnEdit] = useState(false)
	const [isLike, setIsLike] = useState(false)
	const [loadLike, setLoadLike] = useState(false)

	const handleLike = async () => {
		if (loadLike) return
		setIsLike(true)

		setLoadLike(true)
		await dispatch(likeComment({ comment, post, auth }))
		setLoadLike(false)
	}

	const handleUnLike = async () => {
		if (loadLike) return
		setIsLike(false)

		setLoadLike(true)
		await dispatch(unLikeComment({ comment, post, auth }))
		setLoadLike(false)
	}

	useEffect(() => {
		setContent(comment.content)

		if (comment.likes.find((like) => like._id === auth.user._id)) {
			setIsLike(true)
		}
	}, [comment, auth.user._id])

	const handleUpdate = () => {
		if (comment.content !== content) {
			dispatch(updateComment({ comment, post, content, auth }))
			setOnEdit(false)
		} else {
			setOnEdit(false)
		}
	}

	const styleCard = {
		opacity: comment._id ? 1 : 0.5,
		pointerEvents: comment._id ? 'inherit' : 'none',
	}

	return (
		<div className="mt-3 comment_card" style={styleCard}>
			<Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
				<Avatar src={comment.user.avatar} size="small-avatar" />
				<h6 className="mx-1">{comment.user.username}</h6>
			</Link>

			<div className="comment_content">
				<div className="flex-fill">
					{onEdit ? (
						<textarea rows="5" value={content} onChange={(e) => setContent(e.target.value)} />
					) : (
						<div>
							<span>{content.length < 100 ? content : readMore ? content + ' ' : content.slice(0, 100) + '....'}</span>

							{content.length > 100 && (
								<span className="readMore" onClick={() => setReadMore(!readMore)}>
									{readMore ? 'SHOW LESS' : 'SHOW MORE'}
								</span>
							)}
						</div>
					)}

					<div style={{ cursor: 'pointer' }}>
						<small className="mr-3 text-muted">{moment(comment.createdAt).fromNow()}</small>

						<small className="mr-3 font-weight-bold">{comment.likes.length} likes</small>

						{onEdit ? (
							<>
								<small className="mr-3 font-weight-bold" onClick={handleUpdate}>
									Update
								</small>
								<small className="mr-3 font-weight-bold" onClick={() => setOnEdit(false)}>
									Cancel
								</small>
							</>
						) : (
							<small className="mr-3 font-weight-bold">Reply</small>
						)}
					</div>
				</div>

				<div className="mx-2 d-flex align-items-center" style={{ cursor: 'pointer' }}>
					<CommentMenu post={post} comment={comment} auth={auth} setOnEdit={setOnEdit} />
					<LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
				</div>
			</div>
		</div>
	)
}

export default CommentCard
