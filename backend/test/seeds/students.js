exports.seed = function(knex) {
  return knex('student').del()
    .then(function () {
      return knex('student').insert([
        { id: 99999, name: 'Rashini Shehara', age: 12, hometown: 'Galle'}
        
      ]);
    });
};
