const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const db = require("../models");
const verifySignUp = require("./verifySignUp");
const User = db.user;

verifyToken = (req, res,next) =>{
    let token = req.header['x-access-token'];
    if(!token){
        return res.status(403).send({
            mesrage:"No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message:"Unautherized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

idAdmin = (req,res, next) =>{
    User.findByPk(req.userId).then(user=>{
        user.getRoles().then(roles=>{
           for(let i = 0; i< roles.length; i++) {
            if(roles[i].name === "admin"){
                next();
                return;
            }
           }
           res.status(403).send({
            message:"Require Admin Role",
           });
           return;
        });
       
    });
};

isModerator = (req,res, next) =>{
    User.findByPk(req.userId).then(user=>{
        user.getRoles().then(roles=>{
           for(let i = 0; i< roles.length; i++) {
            if(roles[i].name === "Moderator"){
                next();
                return;
            }
           }
           res.status(403).send({
            message:"Require Admin Role",
           });
           return;
        });
       
    });
};

isModeratorOrAdmin = (req,res, next) =>{
    User.findByPk(req.userId).then(user=>{
        user.getRoles().then(roles=>{
           for(let i = 0; i< roles.length; i++) {
            if(roles[i].name === "Moderator"){
                next();
                return;
            }
            if(roles[i].name === "Admin"){
                next();
                return;
            }
           }
           res.status(403).send({
            message:"Require Admin Role",
           });
           return;
        });
       
    });
};

const authJwt ={
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isModerator : isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
}

module.exports authJwt;