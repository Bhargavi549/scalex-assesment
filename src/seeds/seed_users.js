/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex('users').del()
  .then(function () {
    // Inserts seed entries
    return knex('users').insert([
      { username: 'admin', password: 'admin', userType: 'admin' },
      { username: 'user1', password: 'user1', userType: 'regular' },
    ]);
  });
};
