import { useState, useEffect } from 'react'
import Avatar from '../../Avatar'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

import LikeButton from '../../LikeButton'
import CommentMenu from './CommentMenu'

const CommentCard = ({ comment, post }) => {
	const { auth } = useSelector((state) => state)
	const dispatch = useDispatch()

	const [content, setContent] = useState('')
	const [readMore, setReadMore] = useState(false)

	const [isLike, setIsLike] = useState(false)

	const handleLike = () => {}

	const handleUnLike = () => {}

	useEffect(() => {
		setContent(comment.content)
	}, [comment])

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
					<div>
						<span>{content.length < 100 ? content : readMore ? content + ' ' : content.slice(0, 100) + '....'}</span>

						{content.length > 100 && (
							<span className="readMore" onClick={() => setReadMore(!readMore)}>
								{readMore ? 'SHOW LESS' : 'SHOW MORE'}
							</span>
						)}
					</div>

					<div style={{ cursor: 'pointer' }}>
						<small className="mr-3 text-muted">{moment(comment.createdAt).fromNow()}</small>

						<small className="mr-3 font-weight-bold">{comment.likes.length} likes</small>

						<small className="mr-3 font-weight-bold">Reply</small>
					</div>
				</div>

				<div className="mx-2 d-flex align-items-center" style={{ cursor: 'pointer' }}>
					<CommentMenu post={post} comment={comment} auth={auth} />
					<LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
				</div>
			</div>
		</div>
	)
}

export default CommentCard
