const jwt = require("jsonwebtoken")
async function validateRequest(req, res, next) {
  try {
    const AuthHeader = req.headers["authorization"] ?? false
    const requestToken = AuthHeader && AuthHeader.split(" ")[1]
    if (!AuthHeader) {
      res.sendStatus(403)
    } else {
      jwt.verify(
        requestToken,
        process.env.JWT_ACCESS_SECRET,
        (err, decoded) => {
          if (err) {
            console.log(
              new Date().toLocaleString(),
              "-> Request Received With an Unverified AUTH Header"
            )
            res.sendStatus(403)
          } else {
            req.user = decoded
            next()
          }
        }
      )
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  validateRequest,
}
