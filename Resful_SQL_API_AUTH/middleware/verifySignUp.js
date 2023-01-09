const db = require("../models");
const { checkout } = require("../routes/restaurant.router");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUserOrEmail = (req, res, next) =>{
    //Check Username
    //Select * From user where username = username
    User.findOne({
        where:{
            username:req.body.username
        }
    }).then(user => {
        if(user){
            res.status(400).send({
                message:"Failed! Email is already in use !",
            });
            return;
        }
        
    });
    //Check email
    //Select * From user where email = email
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(user => {
        if(user){
            res.status(400).send({
                message:"Failed! Email is already in use !",
            });
            return;
        }
    });
}

checkRoleExisted = (req, res, next) =>{
    if(req.body.roles){
        for(let i=0; i< req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message:"Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }
    next()
}
const verifySignUp = {
    checkDuplicateUserOrEmail: checkDuplicateUserOrEmail,
    checkRoleExisted: checkRoleExisted
}
module.exports = verifySignUp;