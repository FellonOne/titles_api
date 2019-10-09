const pgKnex = require("../database/pg_knex");

const searchDistributor = async ctx => {
    try {
        const searchString = ctx.query.param ? ctx.query.param : '';

        let users;
        if (!Number.isNaN(parseInt(searchString, 10)) && Number.isFinite(parseInt(searchString, 10))) {
            users = await pgKnex.table('users').select(['id', 'roles_id', 'full_name', 'is_active'])
                                .where('id', '=', parseInt(searchString, 10))
                                .andWhere('roles_id', '=', 2)
                                .orderBy('id');
            if (users.length === 0)
                users = await pgKnex.table('users').select(['id', 'roles_id', 'full_name'])
                    .where('full_name', 'like', `%${searchString}%`)
                    .andWhere('roles_id', '=', 2)
                    .limit(10).orderBy('id');
        } else {
            users = await pgKnex.table('users').select(['id', 'roles_id', 'full_name'])
                                .where('full_name', 'like', `%${searchString}%`)
                                .andWhere('roles_id', '=', 2)
                                .limit(10).orderBy('id');
        }
        ctx.status = 200;

        ctx.body = {
            users,
            state: "success",
            find: users.length > 0,
            body: []
        }; return;
    } catch (pgError) {
        global.console.log(pgError);
        ctx.status = 500;
        ctx.body = {
            state: "error",
            find: false,
            body: []
        };
    }
};

const getBaseInformation = async ctx => {
    const userId = ctx.param.id;
};

module.exports = {
    searchDistributor,
    getBaseInformation,
}