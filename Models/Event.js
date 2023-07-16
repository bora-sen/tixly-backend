const { Schema, default: mongoose } = require("mongoose")

const EventSchema = new Schema({
  uuid: String,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  placeholderURL: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: String,
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
