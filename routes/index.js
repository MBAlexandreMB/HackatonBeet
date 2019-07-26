const express = require('express');
const router  = express.Router();
const Cupom = require('../models/Cupom');
const Loja = require('../models/Loja');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

/* GET home page */
router.get('/', (req, res, next) => {
  
  const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDjEmxNVlkhy-PZATJY2At1mo_tS1s6Os8',
    Promise: Promise
  });
  
  googleMapsClient.geocode({address: '1600 Amphitheatre Parkway, Mountain View, CA'})
    .asPromise()
    .then((response) => {
      res.render('index', {gmaps: response.json.results});
      console.log(response.json.results);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/', (req, res, next) => {
  const {nome, sobrenome, email, idade, receita} = req.body;

  Cupom.findOne({email: email})
  .then(result => {
    if(result) {
      res.render('index', {message: 'Ops! Acho que você já se cadastrou por aqui!'});
      return;
    }

    const codigo = bcrypt.hashSync(email, bcrypt.genSaltSync(10)).match(/[A-Za-z1-9]/g).join('');

    Cupom.create({nome, sobrenome, email, idade, receita, codigo})
    .then(cupom => {  

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

    })
    .catch(err => console.log(err));

  })
});

router.get('/cupom/:codigo', (req, res, next) => {
  Cupom.findOneAndUpdate({codigo: req.params.codigo}, {iniciado: true}, {new: true})
  .then(cupom => {
    if(cupom) {
      if(cupom.valido === true) {
        res.render('cupom', { cupom, valido: true });
      } else {
        Cupom.findById(cupom._id).populate('loja')
        .then(cupom => res.render('cupom', { cupom }))
        .catch(err => console.log(err));
      }
      return;
    }

    res.render('cupom', {message: 'Ops! Não encontramos nenhum cupom por aqui!'})
  })
  .catch(err => console.log(err));
});

router.post('/cupom/:id', (req, res, next) => {
  Loja.findOne({codigo: req.body.codigodaloja})
  .then(loja => {
    if (loja) {
      Cupom.findByIdAndUpdate(req.params.id, {valido: false, loja: loja._id}, {new: true})
      .then(cupom => res.render('obrigadoporusar', { cupom }))
      .catch(err => console.log(err));
    }

    Cupom.findById(req.params.id)
    .then(cupom => res.render('cupom', {cupom, message: 'Ops! Loja não encontrada!'}))
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err))
});

module.exports = router;
