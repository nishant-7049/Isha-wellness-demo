const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  admin: {
    getToKnow: {
      type: String,
      required: true,
    },
  },
  complaints: {
    aspect: {
      type: String,
      required: false,
    },
    activity: {
      type: String,
      required: false,
    },
    cause: {
      type: String,
      required: false,
    },
    consult: {
      type: String,
      required: false,
    },
    inv: {
      type: String,
      required: false,
    },
    oldComplaint: {
      type: String,
      required: false,
    },
    otherComplaints: {
      type: String,
      required: false,
    },
    otherMedicalConditions: {
      type: String,
      required: false,
    },
    part: {
      type: String,
      required: false,
    },
    problem: {
      type: String,
      required: false,
    },
    psr: {
      type: Number,
      required: false,
    },
    side: {
      type: String,
      required: false,
    },
    since: {
      type: String,
      required: false,
    },
    tone: {
      type: Number,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    work: {
      type: String,
      required: false,
    },
  },
  lifestyleAndHabits: {
    exerciseDetails: {
      doExercises: {
        type: String,
        required: true,
      },
      exercise: String,
      exercisePerDay: Number,
      exercisePerWeek: Number,
    },
    foodDetails: {
      doBreakfast: {
        type: String,
        required: true,
      },
      emptyStomach: {
        type: String,
        required: true,
      },
      healthyDiet: {
        type: String,
        required: true,
      },
      foodTime: {
        breakfastTime: String,
        lunchTime: {
          type: String,
          reuired: true,
        },
        dinnerTime: {
          type: String,
          reuired: true,
        },
      },
    },
    habits: {
      type: [String],
      required: true,
    },
    problemsInfo: [
      {
        cause: {
          type: String,
          required: true,
        },
        onMedications: {
          type: String,
          required: true,
        },
        problem: {
          type: String,
          required: true,
        },
        sinceWhen: {
          type: Number,
          required: true,
        },
      },
    ],
    sleepDetails: {
      computerScreenHour: {
        type: Number,
        required: true,
      },
      mobileScreenHour: {
        type: Number,
        required: true,
      },
      properSleep: {
        type: String,
        required: true,
      },
      sittingHour: {
        type: Number,
        required: true,
      },
      sleepHour: {
        type: Number,
        required: true,
      },
      sleepTime: {
        type: String,
        required: true,
      },
      tvScreenHour: {
        type: Number,
        required: true,
      },
      wakeTime: {
        type: String,
        required: true,
      },
    },
    stressDetails: {
      disturbanceCause: {
        type: String,
        required: true,
      },
      stressRate: {
        type: Number,
        required: true,
      },
      thinker: {
        type: String,
        required: true,
      },
      thinkingRate: {
        type: Number,
        required: true,
      },
    },
  },
  measures: {
    bp: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    sugar: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  occupation: {
    experience: {
      type: Number,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    work: {
      type: String,
      required: true,
    },
  },
  packageAndDate: {
    dateAndTime: {
      type: Date,
      required: true,
    },
    package: {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      paymentType: {
        type: String,
      },
      price: {
        type: Number,
      },
      sessions: {
        type: Number,
      },
      days: {
        type: Number,
      },
    },
  },
  personal: {
    address: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    martial: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    whatsapp: {
      type: Number,
    },
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
  status: {
    type: String,
    default: "Assigning Staff...",
  },
  validTill: {
    type: Date,
    required: true,
  },
  sessions: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["Cash", "Online"],
    required: true,
  },
  bookedBy: mongoose.Schema.Types.ObjectId,
  payment: mongoose.Schema.Types.ObjectId,
  assignTherapist: mongoose.Schema.Types.ObjectId,
  assignFacilitator: mongoose.Schema.Types.ObjectId,
});

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
