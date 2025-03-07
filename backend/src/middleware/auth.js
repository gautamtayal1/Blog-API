const jwt = require('jsonwebtoken')
const prisma = require("../config/db.config")

const userAuth = async(req, res) => {
  try {
    const {token} = req.cookies
    if(!token) {
      return res.status(401).send("Please Login")
    }
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET)
    const {_id} = decodedObj

    const user = await prisma.user.findUnique({
      where:{
        id: _id
      }
    })
    if(!user){
      return res.status(400).send("User not found")
    }
    console.log("authenticated");
    
     next()
  } catch (error) {
    res.status(400).send("Unauthorized")
  }
}

module.exports = userAuth