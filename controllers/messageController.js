const Message = require('../models/message');
const User = require('../models/user');
const {body,validationResult}=require('express-validator');


exports.message_create_get=function(req,res,next){

    if(!req.user){
        let error = new Error("Please Log In To Access This Page");
        error.status=404;
        return next(error);
    };

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

        console.log(req.user);

        User.findOne(req.user._id).exec(function(err,results){
            if(err){return next(err)};

           

            let message = new Message({
                author: results.username,
                title: req.body.title,
                text: req.body.text
            }).save(err=>{
                if(err){return next(err)};
    
                res.redirect('/');
                
            });
            
        });
    }];

exports.message_delete_get= function(req,res){
    res.send("MESSAGE DELETE GET NOT IMPLEMENTED");
};

exports.message_delete_post= function(req,res){
    res.send("MESSAGE DELETE POST NOT IMPLEMENTED");
};