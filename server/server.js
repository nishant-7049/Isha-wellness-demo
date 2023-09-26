require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const cors = require("cors");
const Razorpay = require("razorpay");

// Connnect DB
connectDB();

//configuring cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.instance = new Razorpay({
  key_id: process.env.RAZOR_API_KEY_ID,
  key_secret: process.env.RAZOR_API_KEY_SECRET,
});

const app = express();
const allowedOrigins = [
  "https://apnicompany.tech",
  "http://localhost:5173",
  "https://apnicompany.tech/admin/edit/frontend",
  "https://apnicompany.tech/admin/users",
  "https://apnicompany.tech/admin/faq/edit/:id",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies to be sent in CORS requests
  })
);

app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload({ useTempFiles: true }));

app.use("/api", require("./routes/UserRoute"));
app.use("/api/forum", require("./routes/forum"));
app.use("/api/quote", require("./routes/quote"));
app.use("/api/testi", require("./routes/testimonialRoute"));
app.use("/api/video", require("./routes/videoRoute"));
app.use("/api/faq", require("./routes/faqRoute"));
app.use("/api/blog", require("./routes/blogRoute"));
app.use("/api/exercise", require("./routes/exerciseRoute"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/package", require("./routes/packageRoute"));
app.use("/api/booking", require("./routes/bookingRoute"));
app.use("/api/treatment", require("./routes/treatmentRoute"));

//Error Handlers (Should be the last pice of middleware)
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server Started at port: ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
