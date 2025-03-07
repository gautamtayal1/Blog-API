const prisma = require("../config/db.config")

const getPost = async(req, res) => {
  try {
    const userId = req.user.id
    const posts = await prisma.blog.findMany({
      where: {
        userId
      }
    })
    res.send(posts)
  } catch (error) {
    res.status(500).send("Internet server error")
  }
}

const createPost = async(req, res) => {
  try {
    const {title, content} = req.body
    const userId = req.user.id
    const newPost = await prisma.blog.create({
      data: {
        title, content, userId
      }
    })
    res.json({data: newPost})
  } catch (error) {
    res.status(500).send("Server error")
  }
}

const deletePost = async(req, res) => {
    const {id} = req.body
  try {
    const deletedBlog = await prisma.blog.delete({
      where: {
        id
      }
    })
    res.send(deletedBlog)
  } catch (error) {
    res.status(500).send("Internet server error")
  }
}

const updatePost = async(req, res) => {
  try {
    const {id, title, content} = req.body
    const updatedPost = await prisma.blog.update({
      where:{
        id
      },
      data: {
        title, content
      }
    })
    res.send(updatedPost)
  } catch (error) {
    res.status(500).send("Internet server error")
  }
}

module.exports = {getPost, createPost, deletePost, updatePost}

