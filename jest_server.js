const app = require('./src/server');
const config = require('./config');

const server = app.listen(config.APP_PORT).on("error", err => {
    global.console.error(err);
});

module.exports = server;