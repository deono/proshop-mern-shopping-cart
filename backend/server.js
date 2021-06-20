import path from "path";
import express from "express";
import { config } from "dotenv";
import colors from "colors";
import morgan from "morgan";
import rfs from "rotating-file-stream";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js"; // add the .js extention when using ES Modules (import syntax)

// routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// dotenv
config();

// connect to the database
connectDB();

// initialize express
const app = express();

// initialize __dirname - equired when using ES modules syntax
const __dirname = path.resolve();

/*
======================================================================
LOGGING
======================================================================
*/

// filename generator
const pad = (num) => (num > 9 ? "" : "0") + num;
const generator = () => {
  let date = new Date();

  let year = date.getFullYear();
  let month = pad(date.getMonth() + 1);
  let day = pad(date.getDate());

  return `${year}${month}/${year}-${month}-${day}_accesslog.log`;
};

// create a rotating write stream
var accessLogStream = rfs.createStream(generator, {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "logs"),
});

// morgan logger
app.use(
  morgan(
    function (tokens, req, res) {
      return [
        tokens.date(req, res, "iso"),
        tokens["http-version"](req, res),
        tokens["remote-addr"](req, res),
        tokens.referrer(req, res),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens["user-agent"](req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");
    },
    { stream: accessLogStream }
  )
);

/*
======================================================================
*******
======================================================================
*/

// parse json data in the request body
app.use(express.json());

// default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// mount routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// route: fetch the PayPal client ID
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// use middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// run the server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);
