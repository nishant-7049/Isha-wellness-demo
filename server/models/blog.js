const mongoose = require("mongoose");

// TOOD: add id of admin who added the blogpost
const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter the title of Blog."],
  },
  description: {
    type: String,
    reqiured: [true, "Enter the Blog Description."],
  },
  image: {
    public_id: String,
    url: String,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const blogModel = mongoose.model("blogs", blogSchema);
module.exports = blogModel;
