const express = require('express');
const router  = express.Router();
const Cupom = require('../models/Cupom');
const nodemailer = require('nodemailer');
// const sparkPostTransport = require('nodemailer-sparkpost-transport')
// // const transporter = nodemailer.createTransport(sparkPostTransport({
// //   'sparkPostApiKey': process.env.SPARKPOST_API_KEY
// // }))

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/', (req, res, next) => {
  const {nome, sobrenome, email, idade, receita} = req.body;

  Cupom.findOne({email: email})
  .then(result => {
    if(result) {
      res.render('index', {message: 'Ops! Acho que você já se cadastrou por aqui!'});
      return;
    }

    codigo = '21hd2180n';

    Cupom.create({nome, sobrenome, email, idade, receita, codigo})
    .then(cupom => {  

      let transporter = nodemailer.createTransport({
        host: "smtp.sparkpostmail.com",
        port: 587,
        auth: {
          type: 'AUTH PLAIN',
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        }
      });

      // let transporter = nodemailer.createTransport({
      //   host: "smtp.mailtrap.io",
      //   port: 2525,
      //   auth: {
      //     user: "ab6ff763f83810",
      //     pass: "72ed7d5f04aee2"
      //   }
      // });

      transporter.sendMail({
        from: '<beet@ironhackers.dev>',
        to: email, 
        subject: 'Você acaba de ganhar um cupom!', 
        text: 'Awesome Message',
        html: '<b>Awesome Message</b>'
      })
      .then(info => {
        res.render('checkemail', { cupom });
        console.log(info)
      })
      .catch(error => console.log(error))

    })
    .catch(err => console.log(err));

  })
});

module.exports = router;
