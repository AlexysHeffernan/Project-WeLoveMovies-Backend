const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

async function list(req, res, next) {
  const isShowing = req.query.is_showing === "true";
  const data = isShowing
    ? await moviesService.listIsShowing()
    : await moviesService.list();
  res.json({ data });
}

async function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function listTheatersWhereShowing(req, res) {
  const data = await moviesService.listTheatersWhereShowing(req.params.movieId);
  res.json({ data });
}

async function listReviews(req, res) {
  const data = await moviesService.listReviews(req.params.movieId);
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), read],
  list: asyncErrorBoundary(list),
  listTheatersWhereShowing: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listTheatersWhereShowing),
  ],
  listReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listReviews),
  ],
};
