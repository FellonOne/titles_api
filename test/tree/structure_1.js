const config = require('../../config');
config.APP_ENV = 'test';
const pg = require('../../src/database/pg_knex');

const init = async () => {

    await pg.table('users').update('roles_id', 100);
    await pg.table('users').update({parent_id: 0});

    await pg.table('users').where({id: 46546}).update({roles_id: 1});
    const root = await pg.table('users').where('roles_id', '=', 1).select('*');


    const users = await pg.table('users').whereIn('id', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30])
                    .select('*');

    for(let i = 0; i < 16; i += 1) {
        const user = users[i];
        console.log(user.id);

        await pg.table('users').where({id: user.id}).update({roles_id: 2});
        // eslint-disable no-await-in-loop
        if(i === 0) {
            await pg.table('users').where({id: user.id}).update({parent_id: 46546});
        }
        if(i>=1 && i <=4) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[0].id});
        }
        if(i >= 5 && i <= 7) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[1].id});
        }
        if(i >= 8 && i <= 9) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[2].id});
        }
        if(i === 12) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[5].id});
        }
        if(i === 13) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[6].id});
        }
        if(i === 14) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[7].id});
        }
        if(i === 15) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[8].id});
        }
        if(i === 10) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[3].id});
        }
        if(i === 11) {
            await pg.table('users').where({id: user.id}).update({parent_id: users[4].id});
        }
        // eslint-disable-next-line no-await-in-loop
        const points = await pg.table('users_points')
                        .where('year_month', '=', 201908)
                        .andWhere('users_id', '=', user.id)
                        .first();

        if(points === undefined) {
            console.log('kEK');
            let personalPoints = 100;
            let accumulativePersonalPoints = 100;

            if(i >= 5 && i <= 7)
            {
                personalPoints = 1000;
                accumulativePersonalPoints = 1000;
            }
            if(i >= 12 && i <= 13)
            {
                personalPoints = 3000;
                accumulativePersonalPoints = 3000;
            } 
            if(i === 2)
                personalPoints = 50;
            if(i === 1)
                personalPoints = 0;

            if(i === 10)
                accumulativePersonalPoints = 600;
            if(i === 9)
                accumulativePersonalPoints = 1000;
            if(i === 15)
                accumulativePersonalPoints = 600;

            // eslint-disable-next-line no-await-in-loop
            await pg.table('users_points').insert({
                users_id: user.id,
                personal_points: personalPoints,
                accumulative_personal_points: accumulativePersonalPoints,
                year_month: 201908
            });
        }
    }
    
}

init();