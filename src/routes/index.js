const Router = require("koa-router");
const update = require("../controllers/update");
const getTitle = require("../controllers/get_title");
const distributorsController = require('../controllers/distribuors');

const router = new Router();

router.get("/api/v1/update", update);
router.get("/api/v1/title/:id", getTitle);
router.get("/api/v1/distributors/find/", distributorsController.searchDistributor);

module.exports = router;



