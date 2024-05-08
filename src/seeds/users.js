/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        { title: 'Book 1', author: 'Author 1', publication_year: 2020 },
        { title: 'Book 2', author: 'Author 2', publication_year: 2019 },
        { title: 'Book 3', author: 'Author 3', publication_year: 2018 }
      ]);
    });
};
