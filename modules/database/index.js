'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require('./config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Making models relationships

//profile link
sequelize.models.User.hasOne(sequelize.models.Profile);

// linking with publication
sequelize.models.Profile.hasMany(sequelize.models.Publication, {
  as: 'Publications',
  foreignKey: 'ProfileId'
});

sequelize.models.Publication.belongsTo(sequelize.models.Profile, {
  foreignKey: 'ProfileId'
});

//linking with workexperience
sequelize.models.Profile.hasMany(sequelize.models.WorkExperience, {
  as: 'WorkExperiences',
  foreignKey: 'ProfileId'
});

sequelize.models.WorkExperience.belongsTo(sequelize.models.Profile, {
  foreignKey: 'ProfileId'
});

//linking with education
sequelize.models.Profile.hasMany(sequelize.models.Education, {
  as: 'Educations',
  foreignKey: 'ProfileId'
});

sequelize.models.Education.belongsTo(sequelize.models.Profile, {
  foreignKey: 'ProfileId'
});

db.sequelize.sync({
  // force: true,
}).then(function() {
  console.log("synced db")
  seed();
});

async function seed(){
  //admin
  let admin = await sequelize.models.User.build({
    name: 'khaled',
    email: 'a@a.com',
    password: '123',
    isAdmin: true,
  });
  admin.save();
  let adminProfile = await sequelize.models.Profile.build({
        phone: '556664054',
        bio: 'I am the best admin in King Fahd University of Petrolium.',
        webURL: 'khaledAdmin',
        office: '22-220'
  });
  await admin.setProfile(adminProfile);

  //Ali
  let ali = await sequelize.models.User.build({
    name: 'Ali',
    email: 'ali@a.com',
    password: '123',
  });
  ali.save();
  let aliProfile = await sequelize.models.Profile.build({
        phone: '593423853',
        bio: 'I am the best publisher in King Fahd University of Petrolium.',
        webURL: 'ali',
        office: '24-220'
  });
  await ali.setProfile(aliProfile);
  //PUB
  aliProfile.createPublication({
    author: "ali moh",
    title: "Nano technology",
    address: "Riyad, Saudi Arabia",
    edition: "3rd",
    journnal: "IEEE",
    month: 5,
    pages: 130,
    publisher: "IEEE",
    year: "2017",
    booktitle: "The age of technology",
    school: "KFUPM",
  });
  aliProfile.createPublication({
    author: "ali moh",
    title: "Nano technology",
    address: "Riyad, Saudi Arabia",
    edition: "3rd",
    journnal: "IEEE",
    month: 5,
    pages: 130,
    publisher: "IEEE",
    year: "2017",
    booktitle: "The age of technology",
    school: "KFUPM",
  });
  aliProfile.createPublication({
    author: "ali moh",
    title: "Nano technology",
    address: "Riyad, Saudi Arabia",
    edition: "3rd",
    journnal: "IEEE",
    month: 5,
    pages: 130,
    publisher: "IEEE",
    year: "2017",
    booktitle: "The age of technology",
    school: "KFUPM",
  });
  aliProfile.createPublication({
    author: "ali moh",
    title: "Nano technology",
    address: "Riyad, Saudi Arabia",
    edition: "3rd",
    journnal: "IEEE",
    month: 5,
    pages: 130,
    publisher: "IEEE",
    year: "2017",
    booktitle: "The age of technology",
    school: "KFUPM",
  });
  //WORK
  aliProfile.createWorkExperience({
    company: "Aqwas",
    position: "Full stack dev",
    info: "Worked on many projects",
    startdate: (new Date()).toJSON(),
    enddate: (new Date()).toJSON()
  });
  aliProfile.createWorkExperience({
    company: "Aqwas",
    position: "Full stack dev",
    info: "Worked on many projects",
    startdate: (new Date()).toJSON(),
    enddate: (new Date()).toJSON()
  });
  aliProfile.createWorkExperience({
    company: "Aqwas",
    position: "Full stack dev",
    info: "Worked on many projects",
    startdate: (new Date()).toJSON(),
    enddate: (new Date()).toJSON()
  });
  //Edu
  aliProfile.createEducation({
    school: "KFUPM",
    major: "SWE",
    gpa: "3.5",
    description: "The best school in Saudi Arabia.",
    date: (new Date()).toJSON()
  });
  aliProfile.createEducation({
    school: "KFUPM",
    major: "SWE",
    gpa: "3.5",
    description: "The best school in Saudi Arabia.",
    date: (new Date()).toJSON()
  });
  aliProfile.createEducation({
    school: "KFUPM",
    major: "SWE",
    gpa: "3.5",
    description: "The best school in Saudi Arabia.",
    date: (new Date()).toJSON()
  });

  //moh
  let moh = await sequelize.models.User.build({
    name: 'moh',
    email: 'moh@a.com',
    password: '123',
  });
  moh.save();
  let mohProfile = await sequelize.models.Profile.build({
        phone: '545526532',
        bio: 'I am the best publisher in King Fahd University of Petrolium.',
        webURL: 'moh',
        office: '24-230'
  });
  await moh.setProfile(mohProfile);
  //PUB
  mohProfile.createPublication({
    author: "ali moh",
    title: "Nano technology",
    address: "Riyad, Saudi Arabia",
    edition: "3rd",
    journnal: "IEEE",
    month: 5,
    pages: 130,
    publisher: "IEEE",
    year: "2017",
    booktitle: "The age of technology",
    school: "KFUPM",
  });
  mohProfile.createPublication({
    author: "ali moh",
    title: "Nano technology",
    address: "Riyad, Saudi Arabia",
    edition: "3rd",
    journnal: "IEEE",
    month: 5,
    pages: 130,
    publisher: "IEEE",
    year: "2017",
    booktitle: "The age of technology",
    school: "KFUPM",
  });
  mohProfile.createPublication({
    author: "ali moh",
    title: "Nano technology",
    address: "Riyad, Saudi Arabia",
    edition: "3rd",
    journnal: "IEEE",
    month: 5,
    pages: 130,
    publisher: "IEEE",
    year: "2017",
    booktitle: "The age of technology",
    school: "KFUPM",
  });
  mohProfile.createPublication({
    author: "ali moh",
    title: "Nano technology",
    address: "Riyad, Saudi Arabia",
    edition: "3rd",
    journnal: "IEEE",
    month: 5,
    pages: 130,
    publisher: "IEEE",
    year: "2017",
    booktitle: "The age of technology",
    school: "KFUPM",
  });
  //WORK
  mohProfile.createWorkExperience({
    company: "Aqwas",
    position: "Full stack dev",
    info: "Worked on many projects",
    startdate: (new Date()).toJSON(),
    enddate: (new Date()).toJSON()
  });
  mohProfile.createWorkExperience({
    company: "Aqwas",
    position: "Full stack dev",
    info: "Worked on many projects",
    startdate: (new Date()).toJSON(),
    enddate: (new Date()).toJSON()
  });
  mohProfile.createWorkExperience({
    company: "Aqwas",
    position: "Full stack dev",
    info: "Worked on many projects",
    startdate: (new Date()).toJSON(),
    enddate: (new Date()).toJSON()
  });
  //Edu
  mohProfile.createEducation({
    school: "KFUPM",
    major: "SWE",
    gpa: "3.5",
    description: "The best school in Saudi Arabia.",
    date: (new Date()).toJSON()
  });
  mohProfile.createEducation({
    school: "KFUPM",
    major: "SWE",
    gpa: "3.5",
    description: "The best school in Saudi Arabia.",
    date: (new Date()).toJSON()
  });
  mohProfile.createEducation({
    school: "KFUPM",
    major: "SWE",
    gpa: "3.5",
    description: "The best school in Saudi Arabia.",
    date: (new Date()).toJSON()
  });
  
}

module.exports = db;

