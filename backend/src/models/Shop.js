const { DataTypes } = require("sequelize");
const { sequelize_loggin, connectDB, sequelize_game } = require("../config/db.js");

const Shop = sequelize_game.define(
    "Shop", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        start: {
            type: DataTypes.DATE,
            allowNull: true
        },
        end: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = Shop;
