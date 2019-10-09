const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const config = require("../../config");

module.exports = async (ctx, next) => {
    const accessToken = ctx.state.access_token;
    const refreshToken = ctx.state.refresh_token;

    try {
        const userTokenData = jwt.verify(accessToken, config.JWT_SECRET);
        ctx.state.r_user = userTokenData;
        await next();
    } catch (accessTokenExperied) {
        if (accessTokenExperied.name === jwt.TokenExpiredError.name) {
            try {
                jwt.verify(refreshToken, config.JWT_SECRET);

                const data = await fetch(`${config.AUTH_API_URL}api/v1/sso/refresh`, {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        bearer: config.BEARER_SECRET,
                        refresh_token: refreshToken,
                    }),
                });
                
                const result = await data.json();
                console.log(result)
                if (result.state === 'success') {
                    ctx.state.update = {
                        update_token: true ,
                        body: result.body
                    };
                    ctx.state.r_user = jwt.verify(result.body.access_token, config.JWT_SECRET);
                    await next();
                } else {
                    console.log('here')
                    throw new Error('Need auth');
                }

            } catch (refreshTokenExperied) {
                console.log(accessTokenExperied)
                console.log(refreshTokenExperied)
                ctx.body = {
                    state: 'error',
                    message: 'unauthorized',
                    need_auth: true
                };
                ctx.status = 200
            }
        }
    }
};


