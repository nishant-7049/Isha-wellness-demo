const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema({
  exercises: [
    {
      mode:{
        type: String,
        enum: ['homework','regular'],
        default:'regular',
        required: true
      },
      exercise: mongoose.Schema.Types.ObjectId,
      reps: {
        type: Number,
      },
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
