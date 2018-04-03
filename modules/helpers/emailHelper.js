'use strict';

const nodemailer                = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'swe363project@gmail.com',
        pass: 'LOLswe363LOL'
    }
});

/**
 * Sends an email.
 * @param {Object}          mailOptions                 Email options.
 * @param {String}          mailOptions.from            From email.
 * @param {String}          mailOptions.to              To email.
 * @param {String}          mailOptions.subject         Subject of the email.
 * @param {String}          mailOptions.text            Text of the email.
 * @param {Function}        cb                          Callback function.
 */
exports.sendEmail = function(mailOptions, cb){
    transporter.sendMail(mailOptions, cb);
};


