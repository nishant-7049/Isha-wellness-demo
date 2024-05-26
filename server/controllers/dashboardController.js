const catchAsyncError = require("../middleware/catchAsyncFunc");
const Booking = require("../models/booking");
const sessionModel = require("../models/session");

exports.getPatientMeterData = catchAsyncError(async (req, res, next) => {
  const patientsData = await Booking.aggregate([
    {
      $lookup: {
        from: "treatments",
        localField: "_id",
        foreignField: "booking",
        as: "treatments",
      },
    },
    {
      $unwind: "$treatments",
    },
    {
      $sort: { "treatments.createdAt": -1 },
    },
    {
      $lookup: {
        from: "sessions",
        localField: "treatments._id",
        foreignField: "treatmentId",
        as: "session",
      },
    },
    {
      $unwind: "$session",
    },
    {
      $sort: { "session.createdAt": -1 },
    },
    {
      $group: {
        _id: {
          name: "$personal.name",
          phone: "$personal.phone",
        },
        cluster: { $last: "$personal.city" },
        location: { $last: "$personal.location" },
        problem: { $last: "$complaints.problem" },
        sessions: { $push: "$session" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        phone: "$_id.phone",
        cluster: "$cluster",
        location: "$location",
        problem: "$problem",
        sessions: "$sessions",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    patientsData,
  });
});

exports.getCentreData = catchAsyncError(async (req, res, next) => {
  const { interval, cluster, year, month } = req.query;
  let startDate, endDate;
  let groupFilter = {
    location: "$personal.location",
  };

  switch (interval) {
    case "all":
      break;
    case "year":
      groupFilter.year = { $year: "$createdAt" };
      break;
    case "month":
      if (!year)
        return res
          .status(403)
          .json({ success: false, message: "year not specified" });
      startDate = `${year}-01-01`;
      endDate = `${parseInt(year) + 1}-01-01`;
      groupFilter.month = { $month: "$createdAt" };
      groupFilter.year = { $year: "$createdAt" };
      break;
    case "day":
      if (!year)
        return res
          .status(403)
          .json({ success: false, message: "year not specified" });
      if (!month)
        return res
          .status(403)
          .json({ success: false, message: "month not specified" });
      startDate = `${year}-${month}-01`;
      let dateMonth = parseInt(month);
      let dateYear = year;
      if (dateMonth == 12) {
        dateMonth = 1;
        dateYear++;
      } else {
        dateMonth++;
      }
      endDate = `${dateYear}-${dateMonth}-01`;
      groupFilter.day = { $dayOfMonth: "$createdAt" };
      groupFilter.month = { $month: "$createdAt" };
      groupFilter.year = { $year: "$createdAt" };
      break;
    default:
      return res
        .status(403)
        .json({ success: false, message: "invalid interval" });
  }

  const dateFilter = {
    $gte: new Date(startDate),
    $lt: new Date(endDate),
  };

  const matchOptions = {};
  if (cluster) {
    matchOptions["personal.city"] = cluster;
  }

  if (!(interval === "year" || interval === "all")) {
    matchOptions.createdAt = dateFilter;
  }

  const bookings = await Booking.aggregate([
    {
      $match: matchOptions,
    },
    {
      $group: {
        _id: groupFilter,
        count: { $sum: 1 },
        collectionAmt: { $sum: "$price" },
      },
    },
  ]);
  res.status(200).json({
    success: true,
    bookings,
  });
});

exports.getTherapistPerformance = catchAsyncError(async (req, res, next) => {
  const bookings = await Booking.aggregate([
    {
      $match: {
        assignTherapist: { $eq: req.user._id },
      },
    },
    {
      $lookup: {
        from: "treatments",
        localField: "_id",
        foreignField: "booking",
        as: "treatments",
      },
    },
    { $sort: { "treatments.createdAt": -1 } },
    {
      $lookup: {
        from: "sessions",
        localField: "treatments._id",
        foreignField: "treatmentId",
        as: "treatmentSessions",
      },
    },
    {
      $sort: { "treatmentSessions.createdAt": -1 },
    },
    {
      $project: {
        _id: "$_id",
        sessions: "$treatmentSessions",
        problem: "$complaints.problem",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    bookings,
  });
});
exports.getFacilitatorPerformance = catchAsyncError(async (req, res, next) => {
  const bookings = await Booking.aggregate([
    {
      $match: {
        assignFacilitator: { $eq: req.user._id },
      },
    },
    {
      $lookup: {
        from: "treatments",
        localField: "_id",
        foreignField: "booking",
        as: "treatments",
      },
    },
    { $sort: { "treatments.createdAt": -1 } },
    {
      $lookup: {
        from: "sessions",
        localField: "treatments._id",
        foreignField: "treatmentId",
        as: "treatmentSessions",
      },
    },
    {
      $sort: { "treatmentSessions.createdAt": -1 },
    },
    {
      $project: {
        _id: "$_id",
        sessions: "$treatmentSessions",
        problem: "$complaints.problem",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    bookings,
  });
});

exports.getDropoutsForTherapist = catchAsyncError(async (req, res, next) => {
  const bookings = await Booking.aggregate([
    {
      $match: {
        assignTherapist: { $eq: req.user._id },
      },
    },
    {
      $lookup: {
        from: "treatments",
        localField: "_id",
        foreignField: "booking",
        as: "treatments",
      },
    },
    {
      $unwind: "$treatments",
    },
    {
      $sort: { "treatments.createdAt": -1 },
    },
    {
      $lookup: {
        from: "sessions",
        localField: "treatments._id",
        foreignField: "treatmentId",
        as: "session",
      },
    },
    {
      $unwind: { path: "$session", preserveNullAndEmptyArrays: true },
    },
    {
      $sort: {
        "session.createdAt": -1,
      },
    },
    {
      $group: {
        _id: {
          name: "$personal.name",
          phone: "$personal.phone",
        },
        problem: { $first: "$complaints.problem" },
        latestTreatment: { $first: "$treatments.createdAt" },
        latestSession: { $first: "$session" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        phone: "$_id.phone",
        problem: "$problem",
        latestSession: "$latestSession",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    bookings,
  });
});
exports.getDropoutsForFacilitator = catchAsyncError(async (req, res, next) => {
  const bookings = await Booking.aggregate([
    {
      $match: {
        assignFacilitator: { $eq: req.user._id },
      },
    },
    {
      $lookup: {
        from: "treatments",
        localField: "_id",
        foreignField: "booking",
        as: "treatments",
      },
    },
    {
      $unwind: "$treatments",
    },
    {
      $sort: { "treatments.createdAt": -1 },
    },
    {
      $lookup: {
        from: "sessions",
        localField: "treatments._id",
        foreignField: "treatmentId",
        as: "session",
      },
    },
    {
      $unwind: { path: "$session", preserveNullAndEmptyArrays: true },
    },
    {
      $sort: {
        "session.createdAt": -1,
      },
    },
    {
      $group: {
        _id: {
          name: "$personal.name",
          phone: "$personal.phone",
        },
        problem: { $first: "$complaints.problem" },
        latestTreatment: { $first: "$treatments.createdAt" },
        latestSession: { $first: "$session" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        phone: "$_id.phone",
        problem: "$problem",
        latestSession: "$latestSession",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    bookings,
  });
});

exports.getTherapistAllSessions = catchAsyncError(async (req, res, next) => {
  const sessions = await Booking.aggregate([
    {
      $match: {
        assignTherapist: { $eq: req.user._id },
      },
    },
    {
      $lookup: {
        from: "treatments",
        localField: "_id",
        foreignField: "booking",
        as: "treatments",
      },
    },
    {
      $unwind: "$treatments",
    },
    {
      $lookup: {
        from: "sessions",
        localField: "treatments._id",
        foreignField: "treatmentId",
        as: "treatmentSessions",
      },
    },
    {
      $unwind: "$treatmentSessions",
    },
    {
      $group: {
        _id: {
          name: "$personal.name",
          phone: "$personal.phone",
        },
        sessions: { $push: "$treatmentSessions" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        phone: "$_id.phone",
        sessions: "$sessions",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    sessions,
  });
});
exports.getFacilitatorAllSessions = catchAsyncError(async (req, res, next) => {
  const sessions = await Booking.aggregate([
    {
      $match: {
        assignFacilitator: { $eq: req.user._id },
      },
    },
    {
      $lookup: {
        from: "treatments",
        localField: "_id",
        foreignField: "booking",
        as: "treatments",
      },
    },
    {
      $unwind: "$treatments",
    },
    {
      $lookup: {
        from: "sessions",
        localField: "treatments._id",
        foreignField: "treatmentId",
        as: "treatmentSessions",
      },
    },
    {
      $unwind: "$treatmentSessions",
    },
    {
      $group: {
        _id: {
          name: "$personal.name",
          phone: "$personal.phone",
        },
        sessions: { $push: "$treatmentSessions" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        phone: "$_id.phone",
        sessions: "$sessions",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    sessions,
  });
});

// statistics to show clusters progress in admin dashboard.
// input -> cluster name or all
// output -> patient count by disease
// output -> improvement of patients in cluster
// problem
// Pain and Stiffness - MD
// Lifestyle and Habits - LD
// rest - ND

exports.getClusterProgress = catchAsyncError(async (req, res, next) => {
  const { startInterval, endInterval, cluster } = req.query;
  const start_date = new Date(Number(startInterval));
  const end_date = new Date(Number(endInterval));

  const matchOption = {
    createdAt: {
      $lte: end_date,
    },
  };

  if (cluster && cluster.toLowerCase() != "all") {
    matchOption["personal.city"] = cluster;
  }

  const sessions = await Booking.aggregate([
    {
      $match: matchOption,
    },
    {
      $lookup: {
        from: "treatments",
        localField: "_id",
        foreignField: "booking",
        as: "treatments",
      },
    },
    {
      $lookup: {
        from: "sessions",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $gte: ["$createdAt", start_date],
                  },
                  {
                    $lte: ["$createdAt", end_date],
                  },
                ],
              },
            },
          },
          {
            $sort: {
              createdAt: 1,
            },
          },
        ],
        localField: "treatments._id",
        foreignField: "treatmentId",
        as: "sessions",
      },
    },
    {
      $addFields: {
        startPsr: {
          $cond: {
            if: {
              $and: [
                {
                  $gte: ["$createdAt", start_date],
                },
                {
                  $lte: ["$createdAt", end_date],
                },
              ],
            },
            then: "$complaints.psr",
            else: {
              $cond: {
                if: {
                  $gte: [
                    {
                      $size: "$sessions",
                    },
                    1,
                  ],
                },
                then: {
                  $arrayElemAt: ["$sessions.questions.psr", 0],
                },
                else: -999,
              },
            },
          },
        },
        endPsr: {
          $cond: {
            if: {
              $gte: [
                {
                  $size: "$sessions",
                },
                1,
              ],
            },
            then: {
              $arrayElemAt: ["$sessions.questions.psr", -1],
            },
            else: 999,
          },
        },
        startPsrDate: {
          $cond: {
            if: {
              $and: [
                {
                  $gte: ["$createdAt", start_date],
                },
                {
                  $lte: ["$createdAt", end_date],
                },
              ],
            },
            then: "$createdAt",
            else: {
              $cond: {
                if: {
                  $gte: [
                    {
                      $size: "$sessions",
                    },
                    1,
                  ],
                },
                then: {
                  $arrayElemAt: ["$sessions.createdAt", 0],
                },
                else: null,
              },
            },
          },
        },
        endPsrDate: {
          $cond: {
            if: {
              $gte: [
                {
                  $size: "$sessions",
                },
                1,
              ],
            },
            then: {
              $arrayElemAt: ["$sessions.createdAt", -1],
            },
            else: null,
          },
        },
      },
    },
    {
      $group: {
        _id: {
          name: "$personal.name",
          phone: "$personal.phone",
        },
        bookings: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $addFields: {
        minStartPsrDate: {
          $min: "$bookings.startPsrDate",
        },
        maxEndPsrDate: {
          $max: "$bookings.endPsrDate",
        },
      },
    },
    {
      $match: {
        minStartPsrDate: {
          $ne: null,
        },
        maxEndPsrDate: {
          $ne: null,
        },
      },
    },
    {
      $project: {
        _id: 1,
        psrBookings: {
          $filter: {
            input: "$bookings",
            as: "booking",
            cond: {
              $or: [
                {
                  $eq: ["$$booking.startPsrDate", "$minStartPsrDate"],
                },
                {
                  $eq: ["$$booking.endPsrDate", "$maxEndPsrDate"],
                },
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        finalPsr: {
          $subtract: [
            {
              $arrayElemAt: ["$psrBookings.startPsr", 0],
            },
            {
              $arrayElemAt: ["$psrBookings.endPsr", -1],
            },
          ],
        },
      },
    },
  ]);
  res.status(200).json({
    success: true,
    sessions,
  });
});

exports.getUserSessions = catchAsyncError(async (req, res, next) => {
  const { name, phone } = req.query;
  if (!(name && phone)) throw new Error("name and phone number required");
  let sessions = await Booking.aggregate([
    [
      {
        $match: {
          "personal.phone": parseInt(phone),
          "personal.name": name,
        },
      },
      {
        $lookup: {
          from: "treatments",
          localField: "_id",
          foreignField: "booking",
          as: "treatments",
        },
      },
      {
        $sort: { "treatments.createdAt": -1 },
      },
      {
        $lookup: {
          from: "sessions",
          localField: "treatments._id",
          foreignField: "treatmentId",
          as: "treatmentSessions",
        },
      },
      {
        $sort: { "treatmentSessions.createdAt": -1 },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          treatmentSessions: 1,
        },
      },
    ],
  ]);
  res.status(200).json({
    success: true,
    sessions,
  });
});

exports.getUserStats = catchAsyncError(async (req, res, next) => {
  const { clusterName } = req.query;
  if (!clusterName) throw new Error("cluster name is required");

  let filterCluster;
  switch (clusterName) {
    case "All":
      filterCluster = {};
      break;
    case "Indore":
      filterCluster = { "personal.city": "Indore" };
      break;
    case "Ratlam":
      filterCluster = { "personal.city": "Ratlam" };
      break;
    case "Jaora":
      filterCluster = { "personal.city": "Jaora" };
      break;
    case "Ahmedabad":
      filterCluster = { "personal.city": "Ahmedabad" };
      break;
    default:
      throw new Error("invalid cluster name");
  }

  let userStats = await Booking.aggregate([
    {
      $match: filterCluster,
    },
    {
      $lookup: {
        from: "treatments",
        localField: "_id",
        foreignField: "booking",
        as: "treatments",
      },
    },
    {
      $lookup: {
        from: "sessions",
        localField: "treatments._id",
        foreignField: "treatmentId",
        as: "sessions",
      },
    },
    {
      $addFields: {
        lastTreatmentSession: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$sessions",
                cond: { $eq: ["$$this.isOutcomeFormSent", true] },
              },
            },
            -1,
          ],
        },
      },
    },
    {
      $group: {
        _id: {
          $switch: {
            branches: [
              {
                case: { $in: ["$complaints.problem", ["Pain", "Stiffness"]] },
                then: "MD",
              },
              {
                case: { $eq: ["$complaints.problem", "Lifestyle and Habits"] },
                then: "LD",
              },
            ],
            default: "ND",
          },
        },
        curedPatients: {
          $sum: {
            $cond: {
              if: {
                $eq: ["$lastTreatmentSession.outcome.outcomeReason", "Cured"],
              },
              then: 1,
              else: 0,
            },
          },
        },
        droppedPatients: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $eq: [{ $type: "$lastTreatmentSession" }, "object"] },
                  {
                    $ne: [
                      "$lastTreatmentSession.outcome.outcomeReason",
                      "Cured",
                    ],
                  },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        activePatients: {
          $sum: {
            $cond: {
              if: {
                $ne: [{ $type: "$lastTreatmentSession" }, "object"],
              },
              then: 1,
              else: 0,
            },
          },
        },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: userStats,
  });
});
