const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../../config/index.js")
// AUTHENTICATION
const restricted = (req, res, next) => {
  const token = req.headers.authorization
  if(!token){
    res.status(401).json("Token please!")
  }else{
    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
      if(err){
        res.status(401).json("Token is bad: " + err.message)
      }else{
        req.decodedToken = decoded
        next()
      }
    })
  }
}

// AUTHORIZATION
const checkRole = (role) => (req, res, next) => {
  if(req.decodedToken.role === role){
    next()
  }else{
    res.status(403).json("You need to be an admin!")
  }
}

module.exports = {
  restricted,
  checkRole,
}
