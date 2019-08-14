const pg = require("../database/pg");
const yearMonth = require('../lib/year_month');
const UserTree = require('../lib/user_tree');

async function concatData (usersRows, pointsRows, bB, dB, lB, pg, yearMonth) {
  const pointsByUserId = [];
  for(let i = 0; i < pointsRows.rows.length; i+=1) {
    pointsByUserId[pointsRows.rows[i].users_id] = pointsRows.rows[i];
  }
  const Tree = new UserTree(usersRows.rows, pointsByUserId, {baseBonus:bB, directorBonus:dB, levelBonus:lB}, pg, yearMonth);
  await Tree.init();
  return Tree;
}

module.exports = async ctx => {
  try {
    ctx.body = {
      method: "get-title"
    };
    await pg.connect();

    ctx.status = 200;

    const usersRows = await pg.query(`SELECT 
    users.id, users.qualification, users.max_titles, users.parent_id,
    users.last_titles, users.last_titles_year_month, users.roles_id, is_active
    FROM users WHERE users.roles_id = 2 OR users.roles_id = 1`);

    const pointsRows = await pg.query('SELECT users_id, personal_points, accumulative_personal_points FROM users_points WHERE year_month = $1', [yearMonth.now()-1]);

    const baseBonus = await pg.query('SELECT * FROM marketing_plan_base_bonus');
    const directorBonus = await pg.query('SELECT * FROM marketing_plan_director_bonus');
    const levelBonus = await pg.query('SELECT * FROM marketing_plan_director_level_bonus');

    const result = await concatData(usersRows, pointsRows, baseBonus.rows, directorBonus.rows, levelBonus.rows, pg, yearMonth);

    //20174
    ctx.body = { //18295
        users: result.getUser(46066),
        state: 'success',
        len: 0
    };
    await pg.close();

  } catch (pgConnectionError) {
    global.console.log(pgConnectionError);
    ctx.status = 500;
    ctx.body = {
      state: "error",
      message: "pgsql connection error",
      error: pgConnectionError
    };
  }
};
