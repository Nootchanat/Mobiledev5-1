const config = require("../configs/db.config")

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host:config.HOST,
    dialect:config.dialect,
    operatorsAliases:false,
    pool:{
        max:config.pool.max,
        min:config.pool.min,
        acquire:config.pool.acquire,
        idle:config.pool.idel,
    },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model")(sequelize, Sequelize);
db.role = require("../models/role.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through:"user_roles",
    foreignKey:"userId",
    otherKey:"roleId",
}); //เป็นการสร้างตารางอัตโนมัติ

db.user.belongsToMany(db.role, {
    through:"user_roles",
    foreignKey:"userId",
    otherKey:"roleId",
}); //เป็นการสร้างตารางอัตโนมัติ

db.ROLES = ["user","admin", "moderator"]
module.exports = db;