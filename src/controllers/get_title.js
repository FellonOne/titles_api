const yearMonth = require("../lib/year_month");
const UserState = require("../models/users_state");

module.exports = async ctx => {
  try {
    ctx.body = {
      method: "get-title"
    };
    const userID = ctx.params.id;
    ctx.status = 200;

    const user = await UserState.findOne({
      users_id: userID,
      year_month: yearMonth.now()
    });

    ctx.body = {
      user,
      state: "success",
      len: 0
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
