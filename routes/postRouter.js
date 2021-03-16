const router = require('express').Router()
const auth = require('../middlewares/auth')
const postController = require('../controllers/postController')

router.route('/posts').post(auth, postController.createPost).get(auth, postController.getPosts)

router.route('/post/:id').patch(auth, postController.updatePost)

module.exports = router
