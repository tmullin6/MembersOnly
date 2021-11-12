var express = require('express');
var router = express.Router();

const user_controller = require("../controllers/userController");

router.get('/join',user_controller.user_upgrade_get);
router.post('/join', user_controller.user_upgrade_post);

module.exports = router;
