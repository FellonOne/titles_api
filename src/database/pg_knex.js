const env = require('../../config')
const knexConfig = require('../../config/knexconfig')[env.APP_ENV];

module.exports = require('knex')(knexConfig);