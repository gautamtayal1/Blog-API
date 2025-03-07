const jwt = require('jsonwebtoken')
const prisma = require("../config/db.config")

const userAuth = async (req, res, next) => {
  console.log("userAuth middleware executed"); 
  try {
    let token = req.cookies.token;
    console.log("Cookies token:", token);

    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    console.log("Token found:", token ? "Yes" : "No");
    if (!token) {
      return res.status(401).send("Please Login");
    }

    const decoded = await jwt.verify(token, "hello");
    console.log("Decoded token:", decoded);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    
    console.log("User found:", user ? "Yes" : "No");

    if (!user) {
      return res.status(400).send("User not found");
    } 
    console.log("authenticated");
    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).send("Unauthorized");
  }
};

module.exports = userAuth