const { Event, User, Ticket } = require("./Models")

async function getUserById(userId) {
  try {
    const sel_user = await User.find({ uuid: userId })
    return sel_user[0]
  } catch (error) {
    console.log(error)
  }
}

async function getUserByName(username) {
  try {
    const sel_user = await User.find({ username })
    return sel_user[0]
  } catch (error) {
    console.log(error)
  }
}

async function AddEvent(eventObj) {
  try {
    const newEvent = new Event(eventObj)
    console.log("returning -> " + newEvent)
    return newEvent
  } catch (error) {
    console.log(error)
  }
}
async function GetAllEvents() {
  try {
    const allEvents = await Event.find({})
    return allEvents
  } catch (error) {
    console.log(error)
  }
}

async function getEventById(eventId) {
  try {
    const sel_event = await Event.find({ uuid: eventId })
    return sel_event[0]
  } catch (error) {
    console.log(error)
  }
}
async function getEventsByUsername(username) {
  try {
    const sel_event = await Event.find({ createdBy: username })
    return sel_event
  } catch (error) {
    console.log(error)
  }
}

async function UpdateEventById(eventId, newEventObj) {
  try {
    const sel_event = await getEventById(eventId)
    sel_event.update(newEventObj)
  } catch (error) {
    console.log(error)
  }
}
async function RemoveEventById(eventId) {
  try {
    await User.deleteOne({ uuid: eventId })
  } catch (error) {
    console.log(error)
  }
}

async function AddUser(userObj) {
  try {
    const { username } = userObj
    const users = await User.find({ username })
    if (users.length > 0) {
      return false
    } else {
      const newUser = new User(userObj)
      await newUser.save()
      return true
    }
  } catch (error) {
    console.log(error)
  }
}
async function verifyUser(username, password) {
  try {
    const sel_user = await getUserByName(username)
    if (sel_user.password === password) {
      return sel_user
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
  }
}

async function RemoveUser(userId) {
  try {
    const sel_user = await User.find({ uuid: userId })
    console.log(sel_user)
  } catch (error) {
    console.log(error)
  }
}

async function RemoveEvent(eventId) {
  try {
    const sel_event = await Event.find({ uuid: eventId })
    console.log(sel_event)
  } catch (error) {
    console.log(error)
  }
}

async function getTicketByPublicId(publicId) {
  try {
    const sel_ticket = await Ticket.find({ public: publicId })
    return sel_ticket[0]
  } catch (error) {
    console.log(error)
  }
}

async function DeleteTicketByPublic(publicId) {
  try {
    await Ticket.deleteOne({ public: publicId })
    return true
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  AddEvent,
  getEventById,
  getUserById,
  UpdateEventById,
  AddUser,
  RemoveUser,
  RemoveEvent,
  getUserByName,
  verifyUser,
  GetAllEvents,
  RemoveEventById,
  getTicketByPublicId,
  DeleteTicketByPublic,
  getEventsByUsername,
}
