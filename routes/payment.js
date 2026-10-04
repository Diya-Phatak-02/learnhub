const router = require("express").Router();
const auth = require("../middleware/auth");
const Course = require("../models/Course");
const User = require("../models/User");

// Step 1: create a demo order
router.post("/create-order", auth, async (req, res) => {
  try {
    const course = await Course.findById(req.body.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json({
      orderId: "demo_order_" + Date.now(),
      amount: course.price,
      title: course.title,
    });
  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
});

// Step 2: confirm the demo payment and unlock the course
router.post("/confirm", auth, async (req, res) => {
  try {
    const { courseId, cardNumber } = req.body;
    const digits = (cardNumber || "").replace(/\s/g, "");

    if (digits.length !== 16)
      return res.status(400).json({ message: "Payment failed: invalid card number" });

    await User.findByIdAndUpdate(req.user.id, { $addToSet: { purchasedCourses: courseId } });
    res.json({ message: "Payment successful! Course unlocked." });
  } catch (err) {
    res.status(500).json({ message: "Payment error" });
  }
});

module.exports = router;