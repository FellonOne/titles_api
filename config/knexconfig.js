const path = require("path");
const config = require('./index');

const BASE_PATH = path.join(__dirname, "src", "database");

module.exports = {
  test: {
    client: "postgres",
    connection: `postgres://${config.PG_LOGIN}:${
      config.PG_PASSWORD
    }@${config.PG_ADDRESS}:5432/${config.PG_DB}_test`,
    migrations: {
      directory: path.join(BASE_PATH, "migrations")
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds")
    }
  },

  development: {
    client: "postgres",
    connection: `postgres://${config.PG_LOGIN}:${
      config.PG_PASSWORD
    }@${config.PG_ADDRESS}:5432/${config.PG_DB}`,
    migrations: {
      directory: path.join(BASE_PATH, "migrations")
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds")
    }
  }
};
