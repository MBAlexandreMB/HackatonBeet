const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Cupom = require('../models/Cupom');
const { sendaMail } = require('../config/email');
require('dotenv').config();
const nodemailer = require('nodemailer');


passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  Admin.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy((username, password, next) => {
  Admin.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user || !(process.env.ADMIN_PASS === password)) {
      return next(null, false, { message: "Incorrect username or password" });
    }

    return next(null, user);
  });
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: '/facebook/callback',
  profileFields: ['id', 'displayName', 'email'],
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, cb) => {
  console.log('--------> profile: ', profile);
  Cupom.findOneAndUpdate({$or: [
    {facebookId: profile.id}, {email: profile.email} ]}, 
    {$set: {facebookId: profile.id, email: profile.email}}, {new: true})
    .then((user) => {
      if (user) {
        // res.render'index', {message: 'Ops! Acho que você já se cadastrou por aqui!'});
        return;
      }

      const codigo = bcrypt.hashSync(profile.id, bcrypt.genSaltSync(10)).match(/[A-Za-z1-9]/g).join('');

      const newUser = new Cupom({
        facebookId: profile.id,
        nome: profile.displayName,
        email: profile.email,
        codigo: codigo,
        receita: req.body.receita,
      });
      newUser.save()
        .then((user) => {
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
        to: profile.email, 
        subject: 'Você acaba de ganhar um cupom!', 
        text: `${process.env.BASE_URL}/cupom/${codigo}`,
        html: `<a href="${process.env.BASE_URL}/cupom/${codigo}">Clique aqui para pegar seu cupom!</a>`
      })
      .then(info => {
        res.render('checkemail', { cupom });
      })
      .catch(error => console.log(error))
        });
    })
    .catch(err => console.log(err));
}));



module.exports = passport;