if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const moviesRouter = require("./movies/movies.router");
app.use("/movies", moviesRouter);

const theatersRouter = require("./theaters/theaters.router");
app.use("/theaters", theatersRouter); 

const reviewsRouter = require("./reviews/reviews.router");
app.use("/reviews", reviewsRouter); 

app.use((req, res, next) => {
  res.status(404).send({ error: "cannot be found." });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).json({ error: message });
});

module.exports = app;