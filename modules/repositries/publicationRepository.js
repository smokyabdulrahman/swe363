var Publication = require('./../database').Publication;
const Op = require('sequelize').Op;

//search by keyword
exports.search = function(keyword){
    return Publication.findAll({
        where:{
            [Op.or]: [
                {
                    author: {
                    [Op.like]: `%${keyword}%`
                    }
                },
                {
                    booktitle: {
                    [Op.like]: `%${keyword}%`
                    }
                }
            ]
        }
    });
}