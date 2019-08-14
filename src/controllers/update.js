module.exports = async(ctx, next) => {
    ctx.status = 200;
    next();
};