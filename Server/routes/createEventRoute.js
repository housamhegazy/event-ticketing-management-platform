const express = require("express");
const router = express.Router();
const User = require("../models/userSchema.js");
const {
  AuthMiddleware,
  authorize,
} = require("../Middleware/AuthMiddleware.js");
const Event = require("../models/eventSchema.js");

router.get("/", AuthMiddleware, authorize("organizer"), (req, res) => {
  res.send("Create Event Route is working");
});
router.post(
  "/create-event",
  AuthMiddleware,
  authorize("organizer"),
  async (req, res) => {
    try {
      const {
        title,
        description,
        category,
        price,
        capacity,
        availableSeats,
        image,
        isPublished,
        date,
        location,
      } = req.body;
      const organizerId = req.user.id;
      // تحقق مما إذا كان المستخدم هو منظم
      const user = await User.findById(organizerId);
      if (!user || user.role !== "organizer") {
        return res
          .status(403)
          .json({
            message: "Access denied. Only organizers can create events.",
          });
      }
      // إنشاء الفعالية الجديدة
      const newEvent = new Event({
        title,
        description,
        category,
        location,
        date,
        price,
        capacity,
        availableSeats,
        image,
        organizer: organizerId,
        isPublished,
      });
      await newEvent.save();
      res
        .status(201)
        .json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ message: "Server error while creating event" });
    }
  },
);

router.get("/my-events", AuthMiddleware, authorize("organizer"), async (req, res) => {
  try {
    const organizerId = req.user.id;
    const events = await Event.find({ organizer: organizerId });
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error while fetching events" });
  }
});

// delete event
router.delete("/delete-event/:id", AuthMiddleware, authorize("organizer"), async (req, res) => {
  try {
    const eventId = req.params.id;
    const organizerId = req.user.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (event.organizer.toString() !== organizerId) {
      return res.status(403).json({ message: "Access denied. You can only delete your own events." });
    }
    await Event.findByIdAndDelete(eventId);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Server error while deleting event" });
  }
});

module.exports = router;
