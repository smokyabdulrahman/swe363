'use strict';

module.exports = function(sequelize, DataTypes) {
    var Publication = sequelize.define('Publication', {
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
        },
        booktitle: {
            type: DataTypes.STRING,
        },
        school: {
            type: DataTypes.STRING,
        },
    });
    
    return Publication;
}