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
        edition: {
            type: DataTypes.STRING,
        },
        journnal: {
            type: DataTypes.STRING,
        },
        month: {
            type: DataTypes.INTEGER,
        },
        pages: {
            type: DataTypes.INTEGER,
        },
        publisher: {
            type: DataTypes.STRING,
        },
        year: {
            type: DataTypes.INTEGER,
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