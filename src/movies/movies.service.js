const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function listIsShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true })
    .groupBy("m.movie_id");
}

function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

function listTheatersWhereShowing(movie_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing")
    .where({ "mt.movie_id": movie_id, "mt.is_showing": true });
}

function listReviews(movie_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.preferred_name", "c.surname", "c.organization_name")
    .where({ "r.movie_id": movie_id })
    .then((reviews) =>
      reviews.map((review) => ({
        ...review,
        critic: {
          critic_id: review.critic_id,
          preferred_name: review.preferred_name,
          surname: review.surname,
          organization_name: review.organization_name,
        },
      }))
    );
}

module.exports = {
  list,
  listIsShowing,
  read,
  listTheatersWhereShowing,
  listReviews,
};
