const { Pool } = require("pg");
const config = require("../../config");

class PostgresConnect {
  constructor(cf) {
    this.config = cf;
  }

  async connect() {
    this.pool = await new Pool({
      host: this.config.PG_ADDRESS,
      password: this.config.PG_PASSWORD,
      port: this.config.PG_PORT,
      database: this.config.PG_DB,
      user: this.config.PG_LOGIN
    })
  }

  async query(q, data) {
    let result = null;
    try {
      result = await this.pool.query(q, data);
      return result;

    } catch (err) {
      global.console.log(err);
      throw new Error(err);
    }
  }

  async close() {
    await this.pool.end();
  }
}




module.exports = new PostgresConnect(config);
