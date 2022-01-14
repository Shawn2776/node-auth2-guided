const jwt = require("jsonwebtoken")
// AUTHENTICATION
const restricted = (req, res, next) => {
  const token = req.headers.authorization
  if(!token){
    res.status(401).json("Token please!")
  }else{
    jwt.verify(token,"keepitsecret",(err,decoded)=>{
      if(err){
        res.status(401).json("Token is bad: " + err.message)
      }
    })
  }
}

// AUTHORIZATION
const checkRole = (req, res, next) => {
  next()
}

module.exports = {
  restricted,
  checkRole,
}
