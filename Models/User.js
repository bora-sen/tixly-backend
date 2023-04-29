const { Schema, default: mongoose } = require("mongoose")
const UserSchema = new Schema({
  uuid: String,
  username: String,
  displayName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  password: String,
})

const User = mongoose.model("User", UserSchema)

module.exports = { User }
