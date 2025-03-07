const prisma = require("../config/db.config")

const getComments = async (req, res) => {
  try {
    const userId = req.user?.id;

    const comments = await prisma.comment.findMany({
      where: {
        blog: {
          userId: userId // Only fetch comments for blogs written by this user
        }
      },
    })

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteComments = async(req, res) => {
  const {id} = req.body
  const deletedComment = await prisma.comment.delete({
    where:{
      id:id
    }
  })
  res.send(deletedComment)
}

const updateComments = async(req, res) => {
  const {id, comment} = req.body
  const updatedComment = await prisma.comment.update({
    where: {
      id:id
    }, data : {
      comment
    }
  }) 
  res.send(updatedComment)
}



module.exports = {getComments, deleteComments, updateComments}