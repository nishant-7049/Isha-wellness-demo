const Quote = require("../models/quote");
const catchAsyncFunc = require("../middleware/catchAsyncFunc");

exports.getQuote = catchAsyncFunc(async (req, res, next) => {
  const quote = await Quote.findById("649d541d163fb892993ba730");
  res.status(200).json({
    success: true,
    quote,
  });
});

exports.updateQuote = catchAsyncFunc(async (req, res, next) => {
  const quote = await Quote.findByIdAndUpdate(
    { _id: "649d541d163fb892993ba730" },
    { quote: req.body.quote },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    quote,
  });
});
