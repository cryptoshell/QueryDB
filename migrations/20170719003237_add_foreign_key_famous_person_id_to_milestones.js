exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function(table) {
      table.integer('famous_person_id');
      table.foreign('famous_person_id').references('id').inTable('famous_people');
    })
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', (table) => {
    table.dropForeign('famous_person_id', 'milestones_famous_person_id_foreign');
    table.dropColumns('famous_person_id');
    })
  ])
};
