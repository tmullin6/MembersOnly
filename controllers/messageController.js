const Message = require('../models/message');
const User = require('../models/user');
const {body,validationResult}=require('express-validator');


exports.message_create_get=function(req,res,next){

    if(!req.user){
        let error = new Error("Please Log In To Access This Page");
        error.status=403;
        return next(error);
    };

    res.render('message-form',{title: "Create New Post", user: req.user});
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
            author: req.user.username,
            title: req.body.title,
            text: req.body.text
        })
        .save(err=>{
            if(err){return next(err)};

            res.redirect('/');
            
        });
}];

exports.message_delete_get= function(req,res, next){

    if(!req.user){
        let error = new Error("Please Log In To Access This Page");
        error.status=403;
        return next(error);
    }
    else if(req.user.membership_status!=="Admin"){
        let error = new Error("You Do Not Have Access To This Page");
        error.status=403;
        return next(error);
    }
    Message.findById(req.params.id).exec(function(err,message){
        if(err){return next(err)};

        res.render("message-delete",{title: "Delete Message", user:req.user, message: message});
    });
};

exports.message_delete_post= function(req,res, next){
    
    Message.findByIdAndRemove(req.params.id, function deletePost(err){
        if(err){return next(err)};

        res.redirect('/');
    });
};