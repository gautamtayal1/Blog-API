const prisma = require("../config/db.config")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signupUser = async(req,res) => {
  try {
    const {username, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        username, email, password: hashedPassword
      }
    })
    res.json({message:"user signed up successfully", data: newUser})

  } catch (error) {
    res.json({message: error.message})
  }
}

const loginUser = async(req,res) => {
  try {
    const {email, password } = req.body
  if (!email) {
    return res.status(401).send("invalid credentials")
  }
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })
  isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(401).send("invalid credentials")
  }
  const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: "1d"})
  res.cookie("token", token)
  res.send(user)

  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

const logoutUser = async(req,res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now())
  })
  res.send("user logged out successfully")
}

module.exports = {signupUser, loginUser, logoutUser}

