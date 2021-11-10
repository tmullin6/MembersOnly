var express = require('express');
var router = express.Router();

const user_controller = require("../controllers/userController");

/* GET home page. */
router.get('/signup', user_controller.user_create_get)

router.post('/signup', user_controller.user_create_post);

module.exports = router;

