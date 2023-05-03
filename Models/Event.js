const { Schema, default: mongoose } = require("mongoose")

const EventSchema = new Schema({
  uuid: String,
  title: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: Object,
  maxPeople: Number,
  peopleJoined: {
    type: Number,
    default: 0,
  },
  peopleList: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
})

const Event = mongoose.model("Event", EventSchema)

module.exports = { Event }
