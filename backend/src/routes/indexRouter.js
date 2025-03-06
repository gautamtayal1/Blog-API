const {Router} = require('express')
const authRouter = require('./authRouter')
const userRouter = require('./UserRouter')
const authorRouter = require('./authorRouter')

const indexRouter = Router()

indexRouter.use('/auth', authRouter)
indexRouter.use('/user', userRouter)
indexRouter.use('/author', authorRouter)

module.exports = indexRouter