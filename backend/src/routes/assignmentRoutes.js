const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");
const generateQuestions = require("../services/aiService");

router.post("/create", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const assignment = await Assignment.create(req.body);

    const aiResponse = await generateQuestions(req.body);

    res.status(201).json({
      message: "Assignment created successfully",
      assignment,
      generatedQuestions: aiResponse
    });

  } catch (error) {
    console.error("FULL ERROR:", error);

    res.status(500).json({
      message: "Error creating assignment",
      error: error.message
    });
  }
});

module.exports = router;