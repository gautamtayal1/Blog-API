const {Router} = require('express')
const { getPost, createPost, updatePost, deletePost } = require('../controllers/authorPostController')
const { getComments, updateComments, deleteComments } = require('../controllers/authorCommentController')
const userAuth = require('../middleware/auth')

const authorRouter = Router()

authorRouter.post('/post', userAuth, createPost)
authorRouter.get('/post', userAuth, getPost)
authorRouter.put('/post', userAuth, updatePost)
authorRouter.delete('/post', userAuth, deletePost)

authorRouter.get('/comment', userAuth, getComments)
authorRouter.put('/comment', userAuth, updateComments)
authorRouter.delete('/comment', userAuth, deleteComments)

module.exports = authorRouter