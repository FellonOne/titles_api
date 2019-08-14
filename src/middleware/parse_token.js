module.exports = async (ctx, next) => {
  const accessToken = ctx.get("Access-Token");
  const refreshToken = ctx.get("Refresh-Token");

  const authData = { accessToken, refreshToken };

  if (
    authData.access_token &&
    authData.refresh_token &&
    authData.access_token.length > 10
  ) {
    ctx.state.authorization = authData;
  } else {
    ctx.state.authorization = null;
  }
  await next();
};
