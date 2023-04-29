const { Schema, default: mongoose } = require("mongoose")

const TicketSchema = new Schema({
  uuid: String,
  eventId: String,
  public: String,
  user: Object,
  createdAd: {
    type: Date,
    default: Date.now(),
  },
})

const Ticket = mongoose.model("Ticket", TicketSchema)

module.exports = { Ticket }
