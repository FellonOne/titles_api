const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const config = require("../../config");

module.exports = async (ctx, next) => {
  const accessToken = ctx.state.authorization != null ? ctx.state.authorization.access_token : null;
  const refreshToken = ctx.state.authorization != null ? ctx.state.authorization.refresh_token : null;
  if (accessToken || refreshToken) {
    try {
      const user = await jwt.verify(accessToken, config.APP_SECRET);
      ctx.state.user = user;
      await next();
    } catch (err) {
      try {
        await jwt.verify(refreshToken, config.APP_SECRET);
        let newTokens = await fetch(
          "http://auth_node:3000/api/v1/refresh",
          {
            method: "POST",
            body: JSON.stringify({ token_refresh: refreshToken })
          }
        );
        newTokens = await newTokens.json();
        if (newTokens.state === "success") {
          const newAccessToken = newTokens.body.access_token;
          const newRefreshToken = newTokens.body.refresh_token;

          ctx.cookies.set("latID", newAccessToken, { httpOnly: false });
          ctx.cookies.set("lrtID", newRefreshToken, { httpOnly: false });
          ctx.set("Authorization", `${newAccessToken}; ${newRefreshToken}`);

          ctx.state.user = await jwt.verify(
            newAccessToken,
            config.APP_SECRET
          );
          await next();
        } else {
          ctx.status = 401;
          throw new Error("Authorization Server Error");
        }
      } catch (authServerError) {
        global.console.error(authServerError);
        ctx.status = 401;
        ctx.body = {
          state: "unathorized",
          message: "Требуется повторная авторизация",
          redirect: true
        };
      }
    }
  } else {
    ctx.status = 401;
    ctx.body = {
      state: "unathorized",
      message: "Требуется повторная авторизация",
      redirect: true
    };
  }
};


