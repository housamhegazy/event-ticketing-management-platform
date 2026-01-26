const express = require("express");
const router = express.Router();
const User = require("../models/userSchema.js");
const {
  AuthMiddleware,
  authorize,
} = require("../Middleware/AuthMiddleware.js");
const Event = require("../models/eventSchema.js");
const {
  cloudinary,
  bufferToDataUri,
  upload,
} = require("../utils/cloudinary.js");

router.get("/", AuthMiddleware, authorize("organizer"), (req, res) => {
  res.send("Create Event Route is working");
});
router.post(
  "/create-event",
  AuthMiddleware,
  authorize("organizer"),
  upload.single("image"),
  async (req, res) => {
    try {
      const {
        title,
        description,
        category,
        price,
        capacity,
        availableSeats,
        isPublished,
        date,
        location,
      } = req.body;
      const organizerId = req.user.id;
      let image = null;
      // إذا تم تحميل صورة، قم برفعها إلى Cloudinary
      if (req.file) {
        const file = bufferToDataUri(req.file.mimetype, req.file.buffer);
        const result = await cloudinary.uploader.upload(file, {
          folder: "events_images",
        });
        image = result.secure_url;
      }
      // تحقق مما إذا كان المستخدم هو منظم
      const user = await User.findById(organizerId);
      if (!user || user.role !== "organizer") {
        return res.status(403).json({
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
        image: image, // هنا بنخزن رابط الـ Cloudinary ✅
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

router.get(
  "/my-events",
  AuthMiddleware,
  authorize("organizer"),
  async (req, res) => {
    try {
      const organizerId = req.user.id;
      const events = await Event.find({ organizer: organizerId });
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Server error while fetching events" });
    }
  },
);
//get event by id 
router.get("/event/:id",AuthMiddleware,authorize("organizer"),async(req,res)=>{
  const organizerId = req.user.id;
  const eventId = req.params.id;
  try {
    const event = await Event.findOne({ _id: eventId});
    if (!event) {
      return res.status(404).json({ message: "Event not found or unauthorized access." });
    }
    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error while fetching event" });
  }
})
// get all events to all users (not only organizer)
router.get("/all-events", AuthMiddleware, async (req, res) => {
  try {
    const events = await Event.find({ isPublished: true });
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error while fetching events" });
  }
});

// delete event
router.delete(
  "/delete-event/:id",
  AuthMiddleware,
  authorize("organizer"),
  async (req, res) => {
    try {
      const eventId = req.params.id;
      const organizerId = req.user.id;
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      if (event.organizer.toString() !== organizerId) {
        return res
          .status(403)
          .json({
            message: "Access denied. You can only delete your own events.",
          });
      }
      // delete event from cloudinary if needed (not implemented here)
      if (event.image) {
        const parts = event.image.split("/");
        const folderName = parts[parts.length - 2]; // سيأخذ 'events_images'
        const fileNameWithExtension = parts[parts.length - 1]; // سيأخذ 'id.jpg'
        const publicId = `${folderName}/${fileNameWithExtension.split(".")[0]}`;

        console.log("Deleting Image with ID:", publicId); // عشان تتأكد في الـ Terminal
        await cloudinary.uploader.destroy(publicId);
      }
      // delete event from database
      await Event.findByIdAndDelete(eventId);
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ message: "Server error while deleting event" });
    }
  },
);

module.exports = router;
