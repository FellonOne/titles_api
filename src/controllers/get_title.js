const pg = require("../database/pg");
const yearMonth = require("../lib/year_month");
const UserTree = require("../lib/user_tree");
const pgKnex = require("../database/pg_knex");

async function concatData(usersRows, pointsRows, bB, dB, lB, pg, yearMonth) {
  const pointsByUserId = [];
  for (let i = 0; i < pointsRows.length; i += 1) {
    pointsByUserId[pointsRows[i].users_id] = pointsRows[i];
  }
  const Tree = new UserTree(
    usersRows,
    pointsByUserId,
    { baseBonus: bB, directorBonus: dB, levelBonus: lB },
    pg,
    yearMonth
  );
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

    const usersRows = await pgKnex
      .table("users")
      .select([
        "id",
        "qualification",
        "max_titles",
        "parent_id",
        "last_titles",
        "last_titles_year_month",
        "roles_id",
        "is_active"
      ])
      .where("roles_id", "=", 2)
      .orWhere("roles_id", "=", 1);

    const pointsRows = await pgKnex
      .table("users_points")
      .select(["users_id", "personal_points", "accumulative_personal_points"])
      .where("year_month", "=", 201908);
    const baseBonus = await pgKnex
      .table("marketing_plan_base_bonus")
      .select("*");
    const directorBonus = await pgKnex
      .table("marketing_plan_director_bonus")
      .select("*");
    const levelBonus = await pgKnex
      .table("marketing_plan_director_level_bonus")
      .select("*");

    const result = await concatData(
      usersRows,
      pointsRows,
      baseBonus,
      directorBonus,
      levelBonus,
      pg,
      yearMonth
    );

    //20174
    ctx.body = {
      //18295
      users: result.getUser(9),
      state: "success",
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
