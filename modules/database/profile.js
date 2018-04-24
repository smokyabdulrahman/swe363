'use strict';

module.exports = function(sequelize, DataTypes) {
    var Profile = sequelize.define('Profile', {
        phone: {
            type: DataTypes.INTEGER, //16-bit integer
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
        },
        isApproved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    
    //must add relations to office, department, photo tables.
    
    return Profile;
}