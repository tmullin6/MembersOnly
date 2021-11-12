const User = require("../models/user");
const bcrypt = require('bcryptjs');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const {body,validationResult} = require('express-validator');

exports.user_create_get= function(req,res,next){
    res.render("signup-form", {title: "Speak Your Mind"});
};

exports.user_create_post= [

    //Sanitize Inputs
    body('first_name').trim().isLength({min:1}).escape().withMessage("First Name Must Be Specified")
    .isAlphanumeric().withMessage("First Name Can Only Contain Alphanumeric Characters"),
    body('last_name').trim().isLength({min:1}).escape().withMessage("Last Name Must Be Specified")
    .isAlphanumeric().withMessage("Last Name Can Only Contain Alphanumeric Characters"),
    body('username').trim().isLength({min:1}).escape().withMessage("Username Must Be Specified"),
    body('password').trim().isLength({min:1}).escape().withMessage("Password Must Be Specified"),
    body('password_confirm').custom((value, { req })=> {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        };
        return true;
    }),

    (req,res,next)=>{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.render("signup-form",{title: "Speak Your Mind", errors: errors.array()});
            return;
        };

        let user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password
        });

       

        bcrypt.hash(user.password,10,(err,hashedpassword)=>{
            if(err){return next(err)};

            user.password=hashedpassword;

            user.save(err=>{
                if(err){return next(err)};
    
                res.redirect('/');
            });
        });
        
    }
]

exports.user_login_get=function(req,res,next){
    res.render('login-form',{title: "Speak Your Mind"});
};


    exports.user_logout=function(req,res,next){
        req.logout();

        res.redirect('/');
    };

    exports.user_upgrade_get= function(req,res,next){
         let passcode = 42069;

         res.render('user-upgrade', {title: "Speak Your Mind", user: req.user, passcode: passcode})
    };

    exports.user_upgrade_post=[
        
        body('passcode').trim().isLength({min:1}).escape().withMessage("Incorrect Passcode"),

        (req,res,next)=>{

            let passcode = 42069;

            const errors= validationResult(req);

            if(!errors.isEmpty()){
                res.render('user-upgrade', {title: "Speak Your Mind", user: req.user, passcode: passcode, errors: errors.array()});
                return;
            };

            if(req.body.passcode != passcode.toString()){
                res.render('user-upgrade', {title: "Speak Your Mind", user: req.user, passcode: passcode});
                return;
            }
            else {
                User.findByIdAndUpdate(req.user._id,{"membership_status":"User"},{},function(err){
                    if(err){return(next(err))};

                    res.redirect('/');
                });
            };
    }];

   


