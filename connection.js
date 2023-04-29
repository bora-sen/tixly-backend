const mongoose = require("mongoose")
require("dotenv").config()

const connection = mongoose.connect(process.env.MONGODB_CONN_URI)
connection.then(() => {
  console.log(new Date().toLocaleString(), "-> Connected to MongoDB Database")
})
module.exports = { connection }
