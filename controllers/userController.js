const User = require("../models/user");
const bcrypt = require('bcryptjs');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const {body,validationResult} = require('express-validator');

exports.user_create_get= function(req,res,next){
    res.render("signup-form", {title: "Members Only Board"});
};

exports.user_create_post= [

    //Sanitize Inputs
    body('first_name').trim().isLength({min:1}).escape().withMessage("First Name Must Be Specified")
    .isAlphanumeric().withMessage("First Name Can Only Contain Alphanumeric Characters"),
    body('last_name').trim().isLength({min:1}).escape().withMessage("Last Name Must Be Specified")
    .isAlphanumeric().withMessage("Last Name Can Only Contain Alphanumeric Characters"),
    body('username').trim().isLength({min:1}).escape().withMessage("Username Must Be Specified"),
    body('password').trim().isLength({min:1}).escape().withMessage("Password Must Be Specified"),

    (req,res,next)=>{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.render("signup-form",{title: "Members Only", errors: errors.array()});
            return;
        };

        let user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password
        })

        bcrypt.hash(user.password,10,(err,hashedpassword)=>{
            if(err){return next(err)};

            user.password=hashedpassword;

            user.save(err=>{
                if(err){return next(err)};
    
                res.redirect('/');
            });
        });
        
    }];

    exports.user_login_get=function(req,res,next){
        res.render('login-form',{title: "Members Only Board"});
    };

    exports.user_login_post=function(req,res){

       
          
        

    }

    exports.user_logout=function(req,res,next){
        req.logout();

        res.redirect('/');
    };

   


