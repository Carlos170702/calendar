/*
 * Routes for events
 * host + /api/events
 */

const { Router } = require("express");
const { validateJwt } = require("../middlewares/validate-jwt");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controller/event.controller");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { isDate } = require("../helpers/isDate");

const router = Router();

// all requests must pass for validateJWT
router.use(validateJwt);

// routes
router.get("/", getEvents);

router.post(
  "/",
  [
    check("title", "title is required").not().isEmpty(),
    check("start", "Start date is not a valid date").custom(isDate),
    check("end", "end date is not a valid date").custom(isDate),
    validateFields,
  ],
  createEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
