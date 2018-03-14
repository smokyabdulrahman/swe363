
'use strict';

module.exports = function(sequelize, DataTypes) {
    var Token = sequelize.define('Token', {
        token: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Token.belongsTo(models.User);
            }
        }
    });

    
    return Token;
}