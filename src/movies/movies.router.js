const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.route("/movies")
.get(controller.list)
.all(methodNotAllowed);



router.route("/:movieId")
.get(controller.read).all(methodNotAllowed);

router.route("/:movieId/theaters")
.get(controller.listTheatersWhereShowing).all(methodNotAllowed);

router.route("/movies/:movieId/reviews")
.get(controller.listReviews).all(methodNotAllowed);

module.exports = router;
