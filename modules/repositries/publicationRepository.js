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

function getPublicationById(id){
    return Publication.findById(id);
}

//delete by id
exports.deleteById = async function(publicationId){
    let publication = await getPublicationById(publicationId);
    return publication.destroy();
}