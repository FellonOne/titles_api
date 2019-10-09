const dotenv = require("dotenv");
const path = require("path");

dotenv.config(path.join(__dirname, "..", ".env"));

module.exports = {
  // application settings
  APP_ENV: process.env.APP_ENV ? process.env.APP_ENV : 'development',
  APP_DEBUG: process.env.APP_DEBUG ? process.env.APP_DEBUG : 'true',
  APP_PORT: process.env.APP_PORT ? process.env.APP_PORT : 3030,

  // secret settings
  JWT_SECRET: process.env.JWT_SECRET ? process.env.JWT_SECRET : 12345,
  BEARER_SECRET: process.env.BEARER_SECRET ? process.env.BEARER_SECRET : 12345,
  SSO_ACTIVATE: process.env.SSO_ACTIVATE,

  // url settings
  AUTH_STATIC_URL: process.env.AUTH_STATIC_URL,
  AUTH_API_URL: process.env.AUTH_API_URL,

  // postgres settings
  PG_ADDRESS: process.env.PG_ADDRESS ? process.env.PG_ADDRESS : 'localhost',
  PG_PORT: process.env.PG_PORT ? process.env.PG_PORT : '5432',
  PG_LOGIN: process.env.PG_LOGIN ? process.env.PG_LOGIN : 'postgres',
  PG_PASSWORD: process.env.PG_PASSWORD ? process.env.PG_PASSWORD : '2355553',
  PG_DB: process.env.PG_DB ? process.env.PG_DB : 'lacore_mlm',

  // mongodb settings
  DB_MONGO_USER: process.env.DB_MONGO_USER ? process.env.DB_MONGO_USER : 'lacore_refresh',
  DB_MONGO_PASSWORD: process.env.DB_MONGO_PASSWORD ? process.env.DB_MONGO_PASSWORD : '123456',
  DB_MONGO_HOST: process.env.DB_MONGO_HOST ? process.env.DB_MONGO_HOST : 'localhost',
  DB_MONGO_BASE: process.env.DB_MONGO_BASE ? process.env.DB_MONGO_BASE: 'lacore_titles',
};
