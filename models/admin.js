'use strict';

const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Admin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // static associate(models) {
        //     // relations can be defined here, for example:
        //     User.hasMany(models.Order, {
        //         foreignKey: 'user_id'
        //     })
        // }
    }

    // Initialize the Admin model with attributes and configurations
    Admin.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false, // constraint level validation (SQL level validation)
        },
        password: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Password cannot be null',
            },
        },
    }, {
        sequelize, // pass the connection instance
        modelName: 'Admin', // Model name used for Sequelize operations
    });
    return Admin;
};
