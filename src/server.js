const Koa = require("koa");
const morgan = require("koa-morgan");
const helmet = require("koa-helmet");
const fs = require("fs");
const path = require("path");
const middlewares = require("./middleware");
const registerName = require("../config/regname");
const router = require("./routes");

const app = new Koa();

app.use(helmet());
app.use(async (ctx, next) => {
  const reqOrigin = ctx.header.origin;
  registerName.forEach(origin => {
    if (origin === reqOrigin) ctx.set("Access-Control-Allow-Origin", reqOrigin);
  });
  ctx.set("Access-Control-Allow-Methods", "GET, POST");
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Allow-Headers", [
    'Origin', 'Content-Type', 'Accept', 'Authorization'
  ]);
  ctx.set("X-Powered-By", "PHP 4.2.0");
  ctx.set("X-XSS-Protection", "1; mode=block; report=/report-xss-violation");
  await next();
});

const fsStream = fs.createWriteStream(
  path.join(__dirname, "..", "logs", "log.txt"),
  { flags: "a" }
);

app.use(morgan('combined', {stream: fsStream}));
app.use(middlewares.parseToken);
// app.use(middlewares.auth);

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
