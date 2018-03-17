
'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    //hash password before creating
    User.afterValidate((user, options) => {
        return bcrypt.hash(user.password, 10).then( hash => {
            user.password = hash;
        });
    });

    // Adding instance level methods

    //verifying Password
    User.prototype.verifyPassword = function(password) {
        return bcrypt.compare(password, this.password);
    };

    return User;
}