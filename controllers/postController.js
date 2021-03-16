const Posts = require('../models/postModel')

const postController = {
	createPost: async (req, res) => {
		try {
			const { content, images } = req.body

			if (images.length === 0) return res.status(400).json({ msg: 'Please add your photo.' })

			const newPost = await Posts({ content, images, user: req.user._id })

			await newPost.save()

			res.json({ msg: 'Post Created', newPost })
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},

	getPosts: async (req, res) => {
		try {
			const posts = await Posts.find({ user: [...req.user.following, req.user._id] }).populate('user likes', 'avatar username fullname')

			res.json({ msg: 'Success!', result: posts.length, posts })
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
}

module.exports = postController
