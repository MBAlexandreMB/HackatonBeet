const express = require('express');
const router  = express.Router();
const Cupom = require('../models/Cupom');
const Loja = require('../models/Loja');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const {ensureLoggedIn} = require("connect-ensure-login");
const passport = require('passport');


router.get('/', ensureLoggedIn('/admin/login'), (req, res, next) => {
  res.render('admin/dashboard');
});

router.get("/login", (req, res, next) => {
  res.render("admin/login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/admin",
  failureRedirect: "/admin/login",
  failureFlash: true,
  passReqToCallback: true
}));

module.exports = router;