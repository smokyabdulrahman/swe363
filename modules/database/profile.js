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
        webURL: {
            type: DataTypes.STRING,
            unique: true,
        },
        office: {
            type: DataTypes.STRING,
        }
    });
    
    //must add relations to office, department, photo tables.
    
    return Profile;
}