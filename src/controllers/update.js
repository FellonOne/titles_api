const yearMonth = require("../lib/year_month");
const UserTree = require("../lib/user_tree");
const pgKnex = require("../database/pg_knex");
const UserState = require("../models/users_state");

async function concatData(usersRows, pointsRows, bB, dB, lB) {
  const pointsByUserId = [];
  for (let i = 0; i < pointsRows.length; i += 1) {
    pointsByUserId[pointsRows[i].users_id] = pointsRows[i];
  }
  const Tree = new UserTree(
    usersRows,
    pointsByUserId,
    { baseBonus: bB, directorBonus: dB, levelBonus: lB },
    pgKnex,
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
      .where(
        "year_month",
        "=",
        yearMonth.now()
      );
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
      levelBonus
    );
    await UserState.init();
    await UserState.deleteMany({});

    result.users.forEach(async user => {
      try {
        if(user.self.id !== undefined)
          await UserState.create({
            users_id: user.self.id,
            parent_id: user.self.parent_id,
            personal_points: user.personal_points,
            group_points: user.group_points,
            structure_points: user.structure_points,
            personal_bonus: user.personal_bonus,
            level_bonus: user.level_bonus,
            step_bonus: user.step_bonus,
            director_bonus: user.director_bonus,
            salary: user.salary,
            count_tm: user.count_tm,
            count_rd: user.count_rd,
            count_gd: 0,
            year_month: yearMonth.now(),
            qualification: user.self.qualification,
            titles_id: user.titles_id
          });
      } catch (err) {
        global.console.log(err);
      }
    });

    ctx.body = {
      state: "success",
      message: "tree updated",
      time: `${new Date().getHours()}:${new Date().getMinutes()}`
    };
  } catch (pgError) {
    global.console.log(pgError);
    ctx.status = 500;
    ctx.body = {
      state: "error",
      message: "pgsql connection error",
      error: pgError
    };
  }
};
