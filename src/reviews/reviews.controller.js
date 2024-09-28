const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const knex = require("../db/connection");

async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
 next({ status: 404, message: 'Review cannot be found.' });
}

async function read(req, res) {
  const { review: data } = res.locals;
  res.json({ data });
}

async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
  };
  const data = await reviewsService.update(updatedReview);

  const critic = await knex("critics")
    .select("*")
    .where({ critic_id: data.critic_id })
    .first();

   res.json({
    data: {
      ...data,
      critic: {
        preferred_name: critic.preferred_name,
        surname: critic.surname,
        organization_name: critic.organization_name,
      },
    },
  });
}
  
async function destroy(req, res) {
  await reviewsService.delete(res.locals.review.review_id);
  res.sendStatus(204); 
}

module.exports = {
  read: [asyncErrorBoundary(reviewExists), read],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};