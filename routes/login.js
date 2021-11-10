const express = require('express');
const router = express.Router();

const user_controller = require("../controllers/userController");


router.get('/login', user_controller.user_login_get)

router.get('/logout',user_controller.user_logout);

module.exports = router;