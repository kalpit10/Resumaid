require("dotenv").config();
const express = require("express");
const userRoute = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const resultRoutes = require("./routes/resultRoutes");
const collegesRoutes = require("./routes/collegesRoutes");
const dbConnect = require("./dbConnect");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
// You can use app.use(express.urlencoded({ extended: true })) to parse URL-encoded request bodies.
app.use(express.urlencoded({ extended: true }));

// /api doesnt matter its just a naming convention. It doesnt matter if you use /api/userRoute or just /userRoute
app.use("/api/user/", userRoute);

app.use(function (req, res, next) {
  if (req.path === "/result" || req.path === "/colleges") {
    res.header("Content-Type", "application/json");
  }
  next();
});

app.set("view engine", "ejs");

//---------------MULTER UPLOAD SECTION-------------------------

app.use("/upload", uploadRoutes);

//---------------RESULT API-------------------------------------

app.use("/result", resultRoutes);
//------------COLLEGE DATA----------------------

app.use("/colleges", collegesRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
