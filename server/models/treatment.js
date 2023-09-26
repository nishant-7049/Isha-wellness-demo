const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema({
  exercises: [
    {
      exercise: mongoose.Schema.Types.ObjectId,
      duration: {
        min: Number,
        sec: Number,
      },
    },
  ],
  createdBy: mongoose.Schema.Types.ObjectId,
  booking: mongoose.Schema.Types.ObjectId,
  createdAt: Date,
});

const treatmentModel = mongoose.model("treatments", treatmentSchema);
module.exports = treatmentModel;
