'use strict';

module.exports = function(sequelize, DataTypes) {
    var WorkExperience = sequelize.define('WorkExperience', {
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false
        },
        info: {
            type: DataTypes.STRING,
        },
        startdate: {
            type: DataTypes.DATEONLY,
        },
        enddate: {
            type: DataTypes.DATEONLY,
        },
    });
    
    return WorkExperience;
}