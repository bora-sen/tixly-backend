const express = require("express")
const auth = express.Router()
auth.use(express.json())
auth.use(express.urlencoded({ extended: true }))
const { AddUser, verifyUser, getUserByName } = require("../controller")
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
      res.sendStatus(400)
    }
  } catch (error) {
    console.log(error)
  }
})

auth.post("/login", async (req, res) => {
  try {
    const sel_user = await getUserByName(req.body.username)
    if (sel_user.password === req.body.password) {
      const accessToken = jwt.sign(sel_user.toJSON(), process.env.JWT_ACCESS_SECRET)
      const refreshToken = jwt.sign(sel_user.toJSON(), process.env.JWT_REFRESH_SECRET)

      res.send({
        username: sel_user.username,
        displayName: sel_user.displayName,
        accessToken,
        refreshToken,
      })
    } else {
      res.sendStatus(400)
    }
  } catch (error) {
    console.log(error)
  }
})
auth.post("/refresh", async (req, res) => {
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
