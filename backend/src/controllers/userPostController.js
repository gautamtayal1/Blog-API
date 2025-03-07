const prisma = require("../config/db.config")


const getUserPosts = async(req, res) => {
  try {
    const posts = await prisma.blog.findMany({})
    res.send(posts)
  } catch (error) {
    res.status(500).send("Internet server error")
  }
}

module.exports = getUserPosts