import CommentCard from './CommentCard'

const CommentsDisplay = ({ comment, post }) => {
	return (
		<div className="comment_display">
			<CommentCard comment={comment} post={post}></CommentCard>
		</div>
	)
}

export default CommentsDisplay
