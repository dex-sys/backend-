const { DataTypes } = require("sequelize");
const { sequelize_game } = require("../config/db.js");
const User = require("./User.js");
const Achievement = require("./Achievement.js");

const User_achievement = sequelize_game.define(
    "User_achievement",
    {
        id_user: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },
        id_achievement: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Achievement,
                key: "id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }, 
        achieved: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, 
    {
        timestamps: true
    }
);

User.belongsToMany(Achievement, { 
    through: User_achievement, 
    foreignKey: "id_user" 
});
Achievement.belongsToMany(User, { 
    through: User_achievement, 
    foreignKey: "id_achievement" 
});

module.exports = User_achievement;
