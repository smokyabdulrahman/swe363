'use strict';

module.exports = function(sequelize, DataTypes) {
    var Education = sequelize.define('Education', {
        school: {
            type: DataTypes.STRING,
            allowNull: false
        },
        major: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gpa: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATEONLY,
        },
    });
    
    return Education;
}