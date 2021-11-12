var express = require('express');
var router = express.Router();

const Message = require('../models/message');

/* GET home page. */
router.get('/', function(req, res, next) {

  Message.find({}).populate('author').exec(function(err,results){
    if(err){return next(err)};

    res.render('index', { title: 'Speak Your Mind', user: req.user, messages: results});
  });
  
});

module.exports = router;
