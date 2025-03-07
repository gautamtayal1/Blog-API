const prisma = require("../config/db.config")

const updateUserComments = async(req, res) => {
  try {
    const {comment, commentId} = req.body
    const updated = await prisma.comment.update({
      where: {
        id: commentId
      },
      data: {
        comment
      }
    })
    res.send(updated)
  } catch (error) {
    res.status(500).send("Internet server error")
  }
}

const createUserComments = async(req, res) => {
  try {
    const {comment, blogId} = req.body
    const userId = req.user.id
    const newPost = await prisma.comment.create({
      data: {
        comment, userId, blogId
      }
    })
    res.send(newPost)
  } catch (error) {
    res.status(500).send("Internet server error")
  }
}

const getUserComments = async(req, res) => {
  try {
    const posts = await prisma.comment.findMany({})
    res.send(posts)
  } catch (error) {
    res.status(500).send("Internet server error")
  }
}

module.exports = {updateUserComments, createUserComments, getUserComments}