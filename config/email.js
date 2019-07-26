require('dotenv').config();
const nodemailer = require('nodemailer');

const sendaMail = (codigo, email) => {
// let transporter = nodemailer.createTransport({
      //   host: "smtp.sparkpostmail.com",
      //   port: 587,
      //   auth: {
      //     type: 'AUTH PLAIN',
      //     user: process.env.MAIL_USER,
      //     pass: process.env.MAIL_PASS,
      //   }
      // });

      let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "ab6ff763f83810",
          pass: "72ed7d5f04aee2"
        }
      });

      transporter.sendMail({
        from: '<beet@ironhackers.dev>',
        to: email, 
        subject: 'Você acaba de ganhar um cupom!', 
        text: `${process.env.BASE_URL}/cupom/${codigo}`,
        html: `<a href="${process.env.BASE_URL}/cupom/${codigo}">Clique aqui para pegar seu cupom!</a>`
      })
      .then(info => {
        res.render('checkemail', { cupom });
      })
      .catch(error => console.log(error))
}

module.exports = sendaMail;