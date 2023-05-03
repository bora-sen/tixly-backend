const { Schema, default: mongoose } = require("mongoose")

const TicketSchema = new Schema({
  uuid: String,
  eventId: String,
  publicId: String,
  username: String,
  displayName:String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

const Ticket = mongoose.model("Ticket", TicketSchema)

module.exports = { Ticket }
