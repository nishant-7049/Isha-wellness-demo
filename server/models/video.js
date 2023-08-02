const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Enter title of video"],
  },
  link: {
    type: String,
    required: [true, "paste video link"],
  },
});

const video = mongoose.model("videos", videoSchema);

module.exports = video;
