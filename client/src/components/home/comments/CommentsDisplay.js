import { useState, useEffect } from 'react'
import CommentCard from './CommentCard'

const CommentsDisplay = ({ comment, post, replyCm }) => {
	const [showRep, setShowRep] = useState([])
	const [next, setNext] = useState(1)

	useEffect(() => {
		setShowRep(replyCm.slice(replyCm.length - next))
	}, [replyCm, next])

	return (
		<div className="comment_display" key={comment._id}>
			<CommentCard comment={comment} post={post} commentId={comment._id}>
				<div className="pl-4">
					{showRep.map((item, index) => item.reply && <CommentCard key={index} comment={item} post={post} commentId={comment._id} />)}

					{replyCm.length - next > 0 ? (
						<div style={{ cursor: 'pointer', color: 'crimson', fontWeight: 'bolder' }} onClick={() => setNext(next + 10)}>
							See More Comments....
						</div>
					) : (
						replyCm.length > 1 && (
							<div style={{ cursor: 'pointer', color: 'crimson', fontWeight: 'bolder' }} onClick={() => setNext(1)}>
								Hide Comments
							</div>
						)
					)}
				</div>
			</CommentCard>
		</div>
	)
}

export default CommentsDisplay
