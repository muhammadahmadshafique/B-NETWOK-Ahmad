const router = require('express').Router()
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

router.get('/search', auth, userController.serachUser)

module.exports = router
