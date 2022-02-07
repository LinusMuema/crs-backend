const nodemailer = require('nodemailer');
const templates = require('../views/templates');
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    auth: {
        user: 'herzina21@gmail.com',
        pass: process.env.SMTP_PASSWORD
    }
});

exports.invited = async (ref, user, temp) => {
    const referee = `${ref.firstname} ${ref.lastname}`
    const info = { name: user.firstname, referee, ref: ref.ref_no, password: temp }
    const html = templates.invited(info)
    const subject = 'Welcome to herzina'
    return this.sendEmail(user.email, subject, html)
}

exports.shared = async (user, data) => {
    const referral = `${data.firstname} ${data.lastname}`
    const info = {name: user.firstname, referral, ref: data.ref_no}

    const html = templates.shared(info)
    const subject = 'Successfully shared herzina'
    return this.sendEmail(user.email, subject, html)
}

exports.sendEmail = async (recipient, subject, html) => {
    const mailOptions = {
        from: '"herzina" <welcome@herzina.io>',
        to: recipient,
        subject: subject,
        html: html
    }
    return transporter.sendMail(mailOptions)
}