const config = require('../../config');

config.APP_ENV = 'test';

const pg = require('../../src/database/pg_knex');


const init = async () => {
    try {
    const users = await pg.table('users').whereIn('id', [200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 
        212, 213, 214, 215, 216, 217, 218, 219])
                    .select('*');

    for(let i = 0; i < users.length; i += 1) {
        const user = users[i];


        await pg.table('users').where({id: user.id}).update({roles_id: 2});
        // eslint-disable no-await-in-loop
        if(i === 0) {
            await pg.table('users').where({id: user.id}).update({parent_id: 46546});
        }
        if(i === 1) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[0].id});
        }
        if(i === 2) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[1].id});
        }
        if(i >= 3 && i <= 4) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[2].id});
        }
        if(i >= 6 && i <= 8) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[4].id});
        }
        if(i === 5) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[3].id});
        }
        if(i >= 9 && i <= 11) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[5].id});
        }
        // eslint-disable-next-line no-await-in-loop
        const points = await pg.table('users_points')
                        .where('year_month', '=', 201908)
                        .andWhere('users_id', '=', user.id)
                        .first();

        if(points === undefined) {
            let personalPoints = 100;
            let accumulativePersonalPoints = 100;

            if(i === 1 || i === 2 || i === 3 || i === 4)
            {
                personalPoints = 0;
                accumulativePersonalPoints = 0;
            }
            if(i === 5 || i === 6 || i === 7 || i === 0 || i === 9 || i === 10 || i === 11)
            {
                personalPoints = 100;
                accumulativePersonalPoints = 100;
            } 

            if (i === 8)
            {
                personalPoints = 200;
                accumulativePersonalPoints = 300;
            }
        
            if (i === 9)
                accumulativePersonalPoints = 1200;
            if(i === 7)
            {
                accumulativePersonalPoints = 1000;
            }
            if(i === 0) {
                personalPoints = 100;
                accumulativePersonalPoints = 2400;
            }
            

            // eslint-disable-next-line no-await-in-loop
            await pg.table('users_points').insert({
                users_id: user.id,
                personal_points: personalPoints,
                accumulative_personal_points: accumulativePersonalPoints,
                year_month: 201908
            });
        }
    }
    console.log('END ENJECTION 3')
    } catch (err) {
        console.log(err);
    }
}

module.exports = init;
