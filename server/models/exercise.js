const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter the name of Exercise."],
  },
  description: {
    type: String,
    required: [true, "Enter the description of exercise."],
  },
  part: {
    type: String,
    required: [true, "Select the part of body."],
  },
  reps: {
    type: Number,
    required: [true, "Select the part of body."],
  },
  duration: {
    min: Number,
    sec: Number,
  },
  gif: {
    public_id: String,
    url: String,
  },
});

const exerciseModel = mongoose.model("exercises", exerciseSchema);
module.exports = exerciseModel;
