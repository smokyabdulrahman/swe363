var bcrypt = require("bcryptjs");


module.exports = function (sequelize, DataTypes) {
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
    }, {
        hooks: {
            afterValidate: function (user) {
                user.password = bcrypt.hashSync(user.password);
            }
        }
    });
    return User;
}