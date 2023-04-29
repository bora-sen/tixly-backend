const express = require("express")
const { GetAllEvents, RemoveEventById, getEventById } = require("../controller")
const { Event } = require("../Models")

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
events.post("/create", validateRequest, async (req, res) => {
  try {
    const { title, description, maxPeople } = req.body
    const newEventObj = {
      uuid: v4(),
      title,
      description,
      maxPeople,
      createdBy: {
        displayName: req.user.displayName,
        username: req.user.username,
      },
    }
    const newEvent = new Event(newEventObj)
    await newEvent.save()
    console.log(
      new Date().toLocaleString(),
      `-> Event [${newEvent.uuid}] Created Successfully by [${newEvent.createdBy.username}]`
    )
    res.send({ message: "Event is Created Successfully", data: newEvent })
  } catch (error) {
    console.log(error)
  }
})
events.delete("/delete", validateRequest, async (req, res) => {
  try {
    const { eventId } = req.body
    const sel_event = await getEventById(eventId)
    if (sel_event.createdBy.username === req.user.username) {
      await RemoveEventById(eventId)
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
