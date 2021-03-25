const Comments = require('../models/commentModel')
const Posts = require('../models/postModel')

const commentController = {
	createComment: async (req, res) => {
		try {
			const { postId, content, tag, reply } = req.body

			const newComment = new Comments({ user: req.user._id, content, tag, reply })

			await Posts.findByIdAndUpdate(
				{ _id: postId },
				{
					$push: { comments: newComment._id },
				},
				{ new: true }
			)
			// await Posts.findOneAndUpdate(
			// 	{ _id: postId },
			// 	{
			// 		$push: { comments: newComment._id },
			// 	},
			// 	{ new: true }
			// )
			await newComment.save()

			res.json({ newComment })
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},

	updateComment: async (req, res) => {
		try {
			const { content } = req.body

			await Comments.findByIdAndUpdate({ _id: req.params.id, user: req.user._id }, { content })

			// await Comments.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { content })

			res.json({ msg: 'Update comment success!' })
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},

	likeComment: async (req, res) => {
		try {
			const comment = await Comments.find({ _id: req.params.id, likes: req.user._id })

			if (comment.length > 0) return res.status(400).json({ msg: 'You liked this Comment.' })

			await Comments.findByIdAndUpdate(
				{ _id: req.params.id },
				{
					$push: { likes: req.user._id },
				},
				{ new: true }
			)

			// await Comments.findOneAndUpdate(
			// 	{ _id: req.params.id },
			// 	{
			// 		$push: { likes: req.user._id },
			// 	},
			// 	{ new: true }
			// )

			res.json({ msg: 'Comment is Liked!!' })
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},

	unLikeComment: async (req, res) => {
		try {
			await Comments.findByIdAndUpdate(
				{ _id: req.params.id },
				{
					$pull: { likes: req.user._id },
				},
				{ new: true }
			)

			// await Comments.findOneAndUpdate(
			// 	{ _id: req.params.id },
			// 	{
			// 		$pull: { likes: req.user._id },
			// 	},
			// 	{ new: true }
			// )

			res.json({ msg: 'Comment is Unliked!!' })
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
}

module.exports = commentController
