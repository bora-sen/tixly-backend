const express = require("express")
const tickets = express.Router()
tickets.use(express.json())

const { v4 } = require("uuid")
const { validateRequest } = require("../Middlewares")
const { Ticket, Event } = require("../Models")
const { getTicketByPublicId, DeleteTicketByPublic } = require("../controller")

tickets.get("/", validateRequest, async (req, res) => {
  try {
    const tickets =
      (await Ticket.find({ username: req.user.username })) ?? false

    res.send(tickets)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

tickets.post("/generate/", validateRequest, async (req, res) => {
  try {
    const { eventId, eventTitle, eventDescription } = req.body
    const newTicketObj = {
      uuid: v4(),
      publicId: v4(),
      eventTitle: eventTitle,
      eventDescription: eventDescription,
      username: req.user.username,
      displayName: req.user.displayName,
      eventId,
    }
    const newTicket = new Ticket(newTicketObj)
    await newTicket.save()

    const filter = { uuid: eventId }
    const sel_event = await Event.findOne(filter)
    const update = { peopleJoined: sel_event.peopleJoined + 1 }
    await Event.findOneAndUpdate(filter, update)

    console.log(
      new Date().toLocaleString(),
      `-> New Ticket Generated from [${newTicket.username}] -> to EventId -> [${newTicket.eventId}]`
    )
    res.send(newTicketObj)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})
tickets.post("/validate", validateRequest, async (req, res) => {
  try {
    const { eventId, publicId } = req.body
    const sel_ticket = await getTicketByPublicId(publicId)
    if (
      sel_ticket.user.username === req.user.username &&
      sel_ticket.eventId === eventId
    ) {
      console.log(
        new Date().toLocaleString(),
        `-> [${sel_ticket.publicId}] is validated successfully`
      )
      res.send("verified")
    } else {
      res.send("not-verified")
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})
tickets.delete("/delete/", validateRequest, async (req, res) => {
  try {
    const { public } = req.body
    const sel_ticket = await getTicketByPublic(public)
    if (sel_ticket.user.username === req.user.username) {
      const result = await DeleteTicketByPublic(public)
      if (result) {
        console.log(
          new Date().toLocaleString(),
          `-> [${sel_ticket.public}] is deleted successfully`
        )
        res.sendStatus(200)
      } else {
      }
      res.sendStatus(400)
    } else {
      res.sendStatus(400)
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

module.exports = {
  tickets,
}
