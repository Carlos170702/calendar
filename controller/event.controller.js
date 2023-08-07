const { request, response } = require("express");
const eventsModel = require("../models/events.model");

const getEvents = async (req = request, res = response) => {
  const events = await eventsModel.find().populate("user", "name");

  res.json({
    ok: true,
    message: events,
  });
};

const createEvent = async (req = request, res = response) => {
  try {
    const newEvent = new eventsModel({ ...req.body, user: req.name });

    const eventCreated = await newEvent.save();

    res.json({
      ok: true,
      message: eventCreated,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: "Error creating event",
    });
  }
};

const updateEvent = async (req = request, res = response) => {
  const eventId = req.params.id;
  const uid = req.name;

  try {
    let event = await eventsModel.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        message: "Event not found",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        message: "User cannot update this event",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    /*
      * get three parameters
        - 0ne: Id of the Event 
        - two: new event or update data
        - three: configuration parameters 
     */
    const eventUpdated = await eventsModel.findByIdAndUpdate(
      eventId,
      newEvent,
      { new: true }
    );

    res.json({
      ok: true,
      message: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error, talk to the administrator",
    });
  }
};

const deleteEvent = async (req = request, res = response) => {
  const eventID = req.params.id;
  const uid = req.name;

  try {
    const event = await eventsModel.findById(eventID);

    if (!event) {
      return res.status(404).json({
        ok: false,
        message: "event not found",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        message: "User cannot delete this event",
      });
    }

    const eventDeleted = await eventsModel.findByIdAndDelete(eventID);

    res.json({
      ok: true,
      message: eventDeleted,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error, talk to the administrator",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
