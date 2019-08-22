const Router = require('koa-router');
const update = require('../controllers/update');
const getTitle = require('../controllers/get_title');

const router = new Router();

router.post('/api/v1/update', update);
router.get('/api/v1/title/:id', getTitle);

module.exports = router;