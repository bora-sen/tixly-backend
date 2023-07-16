const express = require("express")
const app = express()
const { auth, events, tickets } = require("./Routes")
const cors = require("cors")
app.use(express.json())
app.use(cors())
const port = 5000
require("./connection")
app.use("/auth/", auth)

app.use("/events/", events)
app.use("/tickets/", tickets)

app.listen(port, () => {
  console.log(new Date().toLocaleString(), "-> Back-end Server is Started on port - ",port)
})
