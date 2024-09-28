const knex = require("../db/connection");

function read(review_id) {
  return knex("reviews")
    .select("*")
    .where({ review_id })
    .first();
}

function update(updatedReview) {
  return knex("reviews")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then((rows) => rows[0]);  
}

function destroy(review_id) {
  return knex("reviews")
    .where({ review_id })
    .del();
}

module.exports = {
  read,
  update,
  delete: destroy,
};