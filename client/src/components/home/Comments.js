import { useEffect, useState } from 'react'
import CommentsDisplay from './comments/CommentsDisplay'

const Comments = ({ post }) => {
	const [comments, setComments] = useState([])
	const [showComments, setShowComments] = useState([])
	const [next, setNext] = useState(2)

	const [replyComments, setReplyComments] = useState([])

	useEffect(() => {
		const newCm = post.comments.filter((cm) => !cm.reply)
		setComments(newCm)
		setShowComments(newCm.slice(newCm.length - next))
	}, [post.comments, next])

	useEffect(() => {
		const newRepl = post.comments.filter((cm) => cm.reply)
		setReplyComments(newRepl)
	}, [post.comments])

	return (
		<div className="comments">
			{showComments.map((comment, index) => (
				<CommentsDisplay key={index} comment={comment} post={post} replyCm={replyComments.filter((item) => item.reply === comment._id)} />
			))}

			{comments.length - next > 0 ? (
				<div
					className="p-2 border-top"
					style={{ cursor: 'pointer', color: 'crimson', fontWeight: 'bolder' }}
					onClick={() => setNext(next + 10)}
				>
					See More Comments....
				</div>
			) : (
				comments.length > 2 && (
					<div className="p-2 border-top" style={{ cursor: 'pointer', color: 'crimson', fontWeight: 'bolder' }} onClick={() => setNext(2)}>
						Hide Comments
					</div>
				)
			)}
		</div>
	)
}

export default Comments
