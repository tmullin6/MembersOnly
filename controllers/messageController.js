const Message = require('../models/message');
const {body,validationResult}=require('express-validator');


exports.message_create_get=function(req,res,next){
    res.render('message-form',{title: "Create New Message", user: req.user});
};

exports.message_create_post= [

      //Sanitize Inputs
      body('text').trim().isLength({min:1}).escape(),
      body('title').trim().isLength({min:1}).escape(),

      (req,res,next)=>{

        const errors= validationResult(req);

        if(!errors.isEmpty()){
            res.render("message-form", {title: "Create New Post", user: req.user,errors:errors.array()});
        };

        let message = new Message({
            author: req.user.name,
            title: req.body.title,
            text: req.body.text
        })
        .save(err=>{
            if(err){return next(err)};

            res.redirect('/index')
        });

      }


]