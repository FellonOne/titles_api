const dotenv = require("dotenv");
const path = require("path");

dotenv.config(path.join(__dirname, "..", ".env"));

module.exports = {
  APP_DEBUG: process.env.APP_DEBUG ? process.env.APP_DEBUG : true,
  APP_SECRET: process.env.APP_SECRET ? process.env.APP_SECRET : "test",
  APP_PORT: process.env.APP_PORT ? process.env.APP_PORT : 3000,
  PG_USER: process.env.PG_USER ? process.env.PG_USER : "postgres",
  PG_HOST: process.env.PG_HOST ? process.env.PG_HOST : "db",
  PG_DB: process.env.PG_DB ? process.env.PG_DB : "lacore_mlm",
  PG_PASSWORD: process.env.PG_PASSWORD ? process.env.PG_PASSWORD : "2355553",
  PG_PORT: process.env.PG_PORT ? process.env.PG_PORT : "5432",
  APP_ENV: process.env.APP_ENV ? process.env.APP_ENV : "development"
};
