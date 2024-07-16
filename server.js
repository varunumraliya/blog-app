const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env config
dotenv.config();

//import routes
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//MongoDB connection
connectDB();

//rest obj
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `App listening on ${process.env.DEV_MODE} port no ${PORT}!`.bgCyan.white
  )
);
