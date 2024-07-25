'use strict';

const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Ad extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        // static associate(models) {
        //     // associations can be defined here, for example:
        //     User.hasMany(models.Order, {
        //         foreignKey: 'user_id'
        //     })
        // }
    }

    // Initialize the Ad model with attributes and configurations
    Ad.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                isDecimal: true,
                min: {
                    args: [0],
                    msg: 'Price must be greater than or equal to 0',
                },
            }
        },
        phone: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        isApproved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: 'Ad', // Model name used for Sequelize operations
    });
    return Ad;
};
