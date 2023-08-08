require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const cors = require("cors");

var cors_set = {
  origin: "https://apnicompany.tech",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // allow session cookie from browser to pass through
};

// Connnect DB
connectDB();

//configuring cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

const hostedDomain = "https://apnicompany.tech";
app.use((req, res, next) => {
  if (req.hostname === hostedDomain) {
    return next();
  }
  res.status(301).redirect(`https://${hostedDomain}${req.url}`);
});

app.use("*", cors(cors_set));
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
