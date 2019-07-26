const mongoose = require('mongoose');

const Loja = new mongoose.model('lojas', new mongoose.Schema({
  endereco: String,
  numero: Number,
  cep: String,
  bairro: String, 
  cidade: String,
  estado: String,
}, {
    timestamps: true,
  }));

  module.exports = Loja;