const router = require('express').Router()
const auth = require('../middlewares/auth')
const postController = require('../controllers/postController')

router.route('/posts').post(auth, postController.createPost).get(auth, postController.getPosts)

router.route('/post/:id').patch(auth, postController.updatePost).get(auth, postController.getPost).delete(auth, postController.deletePost)

router.patch('/post/:id/like', auth, postController.likePost)

router.patch('/post/:id/unlike', auth, postController.unLikePost)

router.get('/user_posts/:id', auth, postController.getUserPosts)

router.get('/post_discover', auth, postController.getPostsDiscover)

module.exports = router
