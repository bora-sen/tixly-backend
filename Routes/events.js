const express = require("express")
const {
  GetAllEvents,
  RemoveEventById,
  getEventById,
  getEventsByUsername,
} = require("../controller")
const { Event, User } = require("../Models")

const events = express.Router()
events.use(express.json())
const { validateRequest } = require("../Middlewares")
const { v4 } = require("uuid")

events.get("/", async (req, res) => {
  try {
    const events = await GetAllEvents()
    res.send(events)
  } catch (error) {
    console.log(error)
  }
})
events.get("/user/:username", async (req, res) => {
  try {
    const events = await getEventsByUsername(req.params.username)
    res.send(events)
  } catch (error) {
    console.log(error)
  }
})

events.get("/:eventId", async (req, res) => {
  try {
    const events = await getEventById(req.params.eventId)
    res.send(events)
  } catch (error) {
    console.log(error)
  }
})
events.post("/create", validateRequest, async (req, res) => {
  try {
    const { title, description, maxPeople, placeholderURL } = req.body
    const newEventObj = {
      uuid: v4(),
      title,
      description,
      maxPeople,
      createdBy: req.user.username,
      placeholderURL,
    }
    const newEvent = new Event(newEventObj)
    await newEvent.save()
    console.log(
      new Date().toLocaleString(),
      `-> Event [${newEvent.uuid}] Created Successfully by [${newEvent.createdBy.username}]`
    )
    res.send(newEvent)
  } catch (error) {
    console.log(error)
  }
})
events.delete("/delete", validateRequest, async (req, res) => {
  try {
    const { eventId } = req.body
    const sel_event = await getEventById(eventId)
    if (sel_event.createdBy === req.user.username) {
      await Event.deleteOne({ uuid: eventId })
      console.log(
        new Date().toLocaleString(),
        `-> Event [${sel_event.uuid}] is Deleted Successfully`
      )
      res.send("Event is deleted successfully")
    } else {
      res.sendStatus(403)
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = {
  events,
}
