
const nodemailer = require('nodemailer');

const sendMail = (email, subject, text, callback) => {
    var mailUser="youracount@gmail.com";
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: mailUser,
            pass: 'yourpassword'
        }
    });

    const mailOptions = {
        from: mailUser,
        to: mailUser,
        subject: subject,
        html: ` 
            <h1>nombre:</h1>&nbsp;<span>${subject}</span></br>
            <h1>correo:</h1>&nbsp;<span>${email}</span></br>
            <h1>mensaje:</h1>&nbsp;<span>${text}</span>
        `
    }
    transporter.sendMail(mailOptions, function (error, data) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, data.response);
        }
    })
}
// const nodemailer = require('nodemailer');
// const mailgun = require('nodemailer-mailgun-transport');

// const auth = {
//     auth: {
//         api_key: '735017399b9521f2b9b99a337795254f-074fa10c-85454521',
//         domain: 'sandboxd9e64201847c4747ac7b1a6252a5ce93.mailgun.org'
//     }
// }

// const transporter = nodemailer.createTransport(mailgun(auth));

// const sendMail = (email, subject, text, callback) => {

//     const mailOptions = {
//         from: email,
//         to: 'ianazagasty2032@interbayamon.edu',
//         subject,
//         text
//     }

//     transporter.sendMail(mailOptions, function (err, data) {
//         if (err) {
//             callback(err, null);
//         } else {
//             callback(null, data);
//         }
//     })
// }

module.exports = sendMail;