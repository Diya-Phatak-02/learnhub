const router = require("express").Router();
const Course = require("../models/Course");

router.get("/", async (req, res) => {
  res.json(await Course.find());
});

module.exports = router;