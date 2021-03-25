import CommentCard from './CommentCard'

const CommentsDisplay = ({ comment, post }) => {
	return (
		<div className="comment_display" key={comment._id}>
			<CommentCard comment={comment} post={post}></CommentCard>
		</div>
	)
}

export default CommentsDisplay
