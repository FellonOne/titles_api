module.exports = async (ctx, next) => {

  if (ctx.header['access-token'] !== undefined && ctx.header['refresh-token'] !== undefined) {
    ctx.state.access_token = ctx.header['access-token'];
    ctx.state.refresh_token = ctx.header['refresh-token'];
    await next();
  } else {
    ctx.body = {
      state: 'error',
      message: 'unauthorized',
      need_auth: true
    };
    ctx.status = 200
  }
};
