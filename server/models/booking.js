const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  admin: {
    getToKnow: {
      type: String,
      required: true,
    },
  },
  complaints: {
    problem: {
      type: String,
      required: false,
    },
    details: [
      {
        part: String,
        side: String,
        aspect: String,
        psr: Number,
        type: String,
        description: String,
      },
    ],
    activity: {
      type: String,
    },
    cause: [
      {
        type: String,
      },
    ],
    consult: {
      type: String,
    },
    inv: [
      {
        type: String,
      },
    ],
    oldComplaint: {
      type: String,
    },
    otherComplaints: {
      type: String,
    },
    otherMedicalConditions: {
      type: String,
    },
    since: {
      type: String,
    },
    sinceNumbers: {
      type: Number,
    },
    tone: {
      type: Number,
    },
    work: {
      type: String,
    },
  },
  lifestyleAndHabits: {
    exerciseDetails: {
      doExercises: {
        type: String,
      },
      exercise: String,
      exercisePerDay: Number,
      exercisePerWeek: Number,
    },
    foodDetails: {
      doBreakfast: {
        type: String,
      },
      emptyStomach: {
        type: String,
      },
      healthyDiet: {
        type: String,
      },
      foodTime: {
        breakfastTime: String,
        lunchTime: {
          type: String,
        },
        dinnerTime: {
          type: String,
        },
      },
    },
    habits: {
      type: [String],
    },
    problemsInfo: [
      {
        cause: {
          type: String,
        },
        onMedications: {
          type: String,
        },
        problem: {
          type: String,
        },
        sinceWhen: {
          type: Number,
        },
        description: {
          type: String,
        },
      },
    ],
    sleepDetails: {
      computerScreenHour: {
        type: Number,
      },
      mobileScreenHour: {
        type: Number,
      },
      properSleep: {
        type: String,
      },
      sittingHour: {
        type: Number,
      },
      sleepHour: {
        type: Number,
      },
      sleepTime: {
        type: String,
      },
      tvScreenHour: {
        type: Number,
      },
      wakeTime: {
        type: String,
      },
    },
    stressDetails: {
      disturbanceCause: {
        type: String,
      },
      stressRate: {
        type: Number,
      },
      thinker: {
        type: String,
      },
      thinkingRate: {
        type: Number,
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
    },
    sugarLevel: {
      type: Number,
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
