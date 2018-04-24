var Publication = require('./../database').Publication;
var Profile = require('./../database').Profile;

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
                    title: {
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

function getPublicationById(id){
    return Publication.findById(id);
}

exports.getById = function(id){
    return Publication.find({
        where: {id: id},
        include: [Profile]
    });
}

//delete by id
exports.deleteById = async function(publicationId){
    let publication = await getPublicationById(publicationId);
    return publication.destroy();
}