const express = require("express")
const auth = express.Router()
auth.use(express.json())
auth.use(express.urlencoded({ extended: true }))
const { AddUser, verifyUser } = require("../controller")
const jwt = require("jsonwebtoken")
require("dotenv").config()

auth.post("/register", async (req, res) => {
  try {
    const result = await AddUser(req.body)
    if (result) {
      console.log(
        new Date().toLocaleString(),
        `-> User Registered [${req.body.username}] [${req.body.displayName}]`
      )
      res.send("User Is Created!")
    } else {
      res.send("Username Already Exists")
    }
  } catch (error) {
    console.log(error)
  }
})

auth.post("/login", async (req, res) => {
  try {
    const result = await verifyUser(req.body.username, req.body.password)
    if (!result) {
      res.sendStatus(400)
    } else {
      const accessToken = jwt.sign(
        result.toJSON(),
        process.env.JWT_ACCESS_SECRET
      )
      const refreshToken = jwt.sign(
        result.toJSON(),
        process.env.JWT_REFRESH_SECRET
      )

      console.log(
        new Date().toLocaleString(),
        `-> Logged In [${req.body.username}]`
      )
      res.send({
        refreshToken,
        accessToken,
      })
    }
  } catch (error) {
    console.log(error)
  }
})
auth.post("/refresh/", async (req, res) => {
  try {
    const { refreshToken } = req.body
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        console.log(err)
        res.sendStatus(400)
      } else {
        const accessToken = jwt.sign(decoded, process.env.JWT_ACCESS_SECRET)
        res.send({ accessToken })
      }
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = { auth }
