const express = require("express")
const tickets = express.Router()
tickets.use(express.json())

const { v4 } = require("uuid")
const { validateRequest } = require("../Middlewares")
const { Ticket } = require("../Models")
const { getTicketByPublic, DeleteTicketByPublic } = require("../controller")

tickets.post("/generate/", validateRequest, async (req, res) => {
  try {
    const { eventId } = req.body
    const newTicketObj = {
      uuid: v4(),
      public: v4(),
      user: {
        username: req.user.username,
        displayName: req.user.displayName,
      },
      eventId,
    }
    const newTicket = new Ticket(newTicketObj)
    await newTicket.save()
    console.log(
      new Date().toLocaleString(),
      `-> New Ticket Generated from [${newTicket.user.username}] -> to EventId -> [${newTicket.eventId}]`
    )
    res.send({ message: "Ticket is generated successfully", data: newTicket })
  } catch (error) {
    console.log(error)
    res.send(500)
  }
})
tickets.post("/validate/", validateRequest, async (req, res) => {
  try {
    const { eventId } = req.body
    const sel_ticket = await getTicketByPublic(req.body.public)
    if (
      sel_ticket.user.username === req.user.username &&
      sel_ticket.eventId === eventId
    ) {
      console.log(
        new Date().toLocaleString(),
        `-> [${sel_ticket.public}] is validated successfully`
      )
      res.sendStatus(200)
    } else {
      res.sendStatus(400)
    }
  } catch (error) {
    console.log(error)
    res.send(500)
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
        res.sendStatus(400)
      }
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
