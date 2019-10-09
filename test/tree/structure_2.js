const config = require('../../config');

config.APP_ENV = 'test';

const pg = require('../../src/database/pg_knex');


const init = async () => {
    try {

    const users = await pg.table('users').whereIn('id', [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 
        112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127])
                    .select('*');

    for(let i = 0; i < users.length; i += 1) {
        const user = users[i];


        await pg.table('users').where({id: user.id}).update({roles_id: 2});
        // eslint-disable no-await-in-loop
        if(i === 0) {
            await pg.table('users').where({id: user.id}).update({parent_id: 46546});
        }
        if(i>=1 && i <=4) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[0].id});
        }
        if(i >= 5 && i <= 6) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[3].id});
        }
        if(i >= 7 && i <= 8) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[4].id});
        }
        if(i === 9) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[5].id});
        }
        if(i === 10) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[6].id});
        }
        if(i === 11) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[8].id});
        }
        if(i === 12) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[8].id});
        }
        if(i === 13 || i === 14) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[9].id});
        }
        if(i === 15 || i === 16) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[10].id});
        }
        if(i === 17) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[12].id});
        }
        // eslint-disable-next-line no-await-in-loop
        const points = await pg.table('users_points')
                        .where('year_month', '=', 201908)
                        .andWhere('users_id', '=', user.id)
                        .first();

        if(points === undefined) {
            let personalPoints = 100;
            let accumulativePersonalPoints = 100;

            if(i === 1 || i === 2 || i === 3 || i === 7)
            {
                personalPoints = 50;
                accumulativePersonalPoints = 50;
            }
            if(i === 5 || i === 6 || i === 4 || i === 12)
            {
                personalPoints = 0;
                accumulativePersonalPoints = 0;
            } 


            if(i === 9 || i === 10 || i === 0 || i === 8 || i === 11 || i === 17 || i === 13 || i === 14)
            {
                accumulativePersonalPoints = 100;
                personalPoints = 100;
            }
            if(i === 15 || i === 16) {
                personalPoints = 200;
                accumulativePersonalPoints = 200;
            }
                
            if (i === 14 || i === 10 || i === 9)
                accumulativePersonalPoints = 1000;
            if (i === 8)
                accumulativePersonalPoints = 300;

            // eslint-disable-next-line no-await-in-loop
            await pg.table('users_points').insert({
                users_id: user.id,
                personal_points: personalPoints,
                accumulative_personal_points: accumulativePersonalPoints,
                year_month: 201908
            });
        }
    }
    console.log('END ENJECTION 2')
    } catch (err) {
        console.log(err);
    }
}

module.exports = init;
