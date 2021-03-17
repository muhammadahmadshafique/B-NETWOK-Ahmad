const router = require('express').Router()
const auth = require('../middlewares/auth')
const postController = require('../controllers/postController')

router.route('/posts').post(auth, postController.createPost).get(auth, postController.getPosts)

router.route('/post/:id').patch(auth, postController.updatePost)

router.patch('/post/:id/like', auth, postController.likePost)
router.patch('/post/:id/unlike', auth, postController.unLikePost)

module.exports = router
