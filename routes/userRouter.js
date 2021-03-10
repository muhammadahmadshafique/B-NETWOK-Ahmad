const router = require('express').Router()
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

router.get('/search', auth, userController.serachUser)

router.get('/user/:id', auth, userController.getUser)

router.patch('/user', auth, userController.updateUser)

module.exports = router
