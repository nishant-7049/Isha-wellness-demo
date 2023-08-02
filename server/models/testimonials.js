const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter name"],
  },
  testimonial: {
    type: String,
    required: [true, "Enter Testimonial"],
  },
  cluster: {
    type: String,
    required: [true, "Enter city name"],
  },
  image: {
    public_id: String,
    url: String,
  },
});

const testimonial = mongoose.model("testimonials", TestimonialSchema);
module.exports = testimonial;
