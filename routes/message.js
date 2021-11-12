const express= require('express');
const router = express.Router();

const message_controller = require('../controllers/messageController');

router.get('/create',message_controller.message_create_get);

router.post('/create',message_controller.message_create_post);

router.get('/delete',message_controller.message_delete_get);

router.post('/delete',message_controller.message_delete_post);

module.exports = router;