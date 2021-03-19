import CommentsDisplay from './comments/CommentsDisplay'

const Comments = ({ post }) => {
	return (
		<div className="comments">
			{post.comments.map((comment) => (
				<CommentsDisplay key={comment._id} comment={comment} post={post} />
			))}
		</div>
	)
}

export default Comments
