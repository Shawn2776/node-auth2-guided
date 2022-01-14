const jwt = require('jsonwebtoken')
const { TOKEN_SECRET } = require('../../config/index')


// AUTHENTICATION
const restricted = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) {
        next({ status: 401, message: `bad token: ${err.message}`})
      } else {
        req.decodedJwt = decoded
        next()
      }
    })
  } else{
    next({ status: 401, message: 'No token found!'})
  }
}

// AUTHORIZATION
const checkRole = (role) => (req, res, next) => {
  if (req.decodedJwt.role === role) {
    next()
  } else {
    next({ status: 403, message: 'Unauthorized!'})
  }
}

module.exports = {
  restricted,
  checkRole,
}
