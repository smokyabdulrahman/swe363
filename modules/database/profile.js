'use strict';

module.exports = function(sequelize, DataTypes) {
    var Profile = sequelize.define('Profile', {
        phone: {
            type: DataTypes.SMALLINT, //16-bit integer
            unique: true
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nickname: { //for url
            type: DataTypes.STRING,
            unique: true,
        }
    });
    
    //must add relations to office, department, photo tables.
    
    return Profile;
}