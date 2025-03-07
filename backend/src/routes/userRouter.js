const {Router} = require('express')
const getUserPosts = require('../controllers/userPostController')
const { getUserComments, updateUserComments, createUserComments } = require('../controllers/userCommentController')
const userAuth = require('../middleware/auth')


const userRouter = Router()

userRouter.get('/post', userAuth, getUserPosts)

userRouter.get('/comment', userAuth, getUserComments)
userRouter.put('/comment', userAuth, updateUserComments)
userRouter.post('/comment', userAuth, createUserComments)

module.exports = userRouter