const express = require('express');
const router  = express.Router();
const Cupom = require('../models/Cupom');
const {ensureLoggedIn} = require("connect-ensure-login");
const passport = require('passport');

const getInfo = (cupons) => {
  const min = 0;
  const max = 0;
  const lojaMax = '';
  const lojaMin = '';
  const lojas = [];
  let totalAtivos = 0;
  let totalResgatados = 0;

  for (let x = 0; x < cupons.length; x += 1) {
  //   // CRIA UM OBJETO COM A RELAÇÃO DAS LOJAS E SEUS REDEEMS
  //   if(cupons[x].lojas.codigo && cupons[x].lojas.codigo !== '') {
  //     lojas.push({
  //       _id: cupons[x].lojas._id,
  //       codigo: cupons[x].lojas.codigo,
  //       total: lojas.total + 1;
  //     });
  //   }

  //   // VERIFICA LOJA COM MENOR NÚMERO DE RESGATES
  //   if (lojas[lojas.length - 1].total < min) {
  //       min = lojas[lojas.length - 1].total;
  //       lojaMin = lojas[lojas.length - 1].codigo;
  //   } else if (lojas[lojas.length - 1].total === min) {
  //       lojasMin += ' | ' + lojas[lojas.length - 1].codigo;
  //   }

  //   // VERIFICA LOJA COM MAIOR NÚMERO DE RESGATES
  //   if (lojas[lojas.length - 1].total > max) {
  //     max = lojas[lojas.length - 1].total;
  //     lojaMax = lojas[lojas.length - 1].codigo;
  //   } else if (lojas[lojas.length - 1].total === max) {
  //     lojasMax += ' | ' + lojas[lojas.length - 1].codigo;
  // }
    
    // VERIFICA O NÚMERO DE PESSOAS QUE ABRIRAM A PÁGINA DO CUPOM
    if(cupons[x].iniciado) {
      totalAtivos += 1;
    }

     // VERIFICA O NÚMERO DE PESSOAS QUE USARAM O CUPOM
    if(!cupons[x].valido) {
      totalResgatados += 1;
    }
  }
  
  return {totalAtivos, totalResgatados, lojaMax, lojaMin, lojas}
}

// const somaCuponsAtivados = (cupons) => {
//   let totalAtivos = 0;
//   for (let x = 0; x < cupons.length; x += 1) {
//     if(cupons[x].iniciado) {
//       totalAtivos += 1;
//     }
//   }

//   return totalAtivos;
// }

// const somaCuponsResgatados = (cupons) => {
//   let totalResgatados = 0;
//   for (let x = 0; x < cupons.length; x += 1) {
//     if(!cupons[x].valido) {
//       totalResgatados += 1;
//     }
//   }

//   return totalResgatados;
// }

router.get('/', ensureLoggedIn('/admin/login'), (req, res, next) => {
  Cupom.find().populate('loja')
  .then(cupons => {
    // console.log(cupons);
    const totalLeads = cupons.length;
    const { totalAtivos, totalResgatados } = getInfo(cupons);
    // const totalResgatados = somaCuponsResgatados(cupons);
    res.render('admin/dashboard', {cupons, totalLeads, totalAtivos, totalResgatados});
  })
  .catch(err => console.log(err));

  // res.render('admin/dashboard');
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

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/admin/login");
});

module.exports = router;