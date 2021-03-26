import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../../redux/actions/commentAction'

const CommentMenu = ({ post, comment, setOnEdit }) => {
	const { auth } = useSelector((state) => state)
	const dispatch = useDispatch()

	const handleRemove = () => {
		if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
			dispatch(deleteComment({ post, comment, auth }))
		}
	}

	const MenuItem = () => {
		return (
			<>
				<div className="dropdown-item" onClick={() => setOnEdit(true)}>
					<span className="material-icons">create</span> Edit
				</div>
				<div className="dropdown-item">
					<span className="material-icons" onClick={handleRemove}>
						delete_outline
					</span>{' '}
					Remove
				</div>
			</>
		)
	}

	return (
		<div className="menu">
			{(post.user._id === auth.user._id || comment.user._id === auth.user._id) && (
				<div className="nav-item dropdown">
					<span className="material-icons" id="moreLink" data-toggle="dropdown" style={{ paddingTop: '6px', paddingRight: '2px' }}>
						more_vert
					</span>

					<div className="dropdown-menu" aria-labelledby="moreLink">
						{post.user._id === auth.user._id ? (
							comment.user._id === auth.user._id ? (
								MenuItem()
							) : (
								<div className="dropdown-item">
									<span className="material-icons" onClick={handleRemove}>
										delete_outline
									</span>{' '}
									Remove
								</div>
							)
						) : (
							comment.user._id === auth.user._id && MenuItem()
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default CommentMenu
