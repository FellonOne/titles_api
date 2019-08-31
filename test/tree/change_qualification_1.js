const config = require('../../config');

config.APP_ENV = 'test';
const pg = require('../../src/database/pg_knex');

const init = async (param) => {
    await pg.table('users_states_histories').delete();

    if (param === 1) {
        await pg.table('users_states_histories').insert({
            users_id: 2,
            personal_points: 100,
            users_titles_id: 13,
            structure_points: 1000,
            group_points: 0,
            personal_bonus: 10,
            step_bonus: 10,
            level_bonus: 10,
            director_bonus: 10,
            qualification: 1,
            year_month: 201907,
        });
    
        await pg.table('users_states_histories').insert({
            users_id: 2,
            personal_points: 100,
            users_titles_id: 12,
            structure_points: 1000,
            group_points: 0,
            personal_bonus: 10,
            step_bonus: 10,
            level_bonus: 10,
            director_bonus: 10,
            qualification: 1,
            year_month: 201906
        });
    
        await pg.table('users_states_histories').insert({
            users_id: 2,
            personal_points: 100,
            users_titles_id: 12,
            structure_points: 1000,
            group_points: 0,
            personal_bonus: 10,
            step_bonus: 10,
            level_bonus: 10,
            director_bonus: 10,
            qualification: 1,
            year_month: 201905
        });
    
    
        await pg.table('users_states_histories').insert({
            users_id: 2,
            personal_points: 100,
            users_titles_id: 12,
            structure_points: 1000,
            group_points: 0,
            personal_bonus: 10,
            step_bonus: 10,
            level_bonus: 10,
            director_bonus: 10,
            qualification: 1,
            year_month: 201904
        });
    
        await pg.table('users_states_histories').insert({
            users_id: 2,
            personal_points: 100,
            users_titles_id: 12,
            structure_points: 1000,
            group_points: 0,
            personal_bonus: 10,
            step_bonus: 10,
            level_bonus: 10,
            director_bonus: 10,
            qualification: 1,
            year_month: 201903
        });
    
        await pg.table('users_states_histories').insert({
            users_id: 2,
            personal_points: 100,
            users_titles_id: 12,
            structure_points: 1000,
            group_points: 0,
            personal_bonus: 10,
            step_bonus: 10,
            level_bonus: 10,
            director_bonus: 10,
            qualification: 1,
            year_month: 201902
        });
    } 
}

module.exports = init;
