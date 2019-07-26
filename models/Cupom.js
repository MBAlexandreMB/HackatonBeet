const mongoose = require('mongoose');

const Cupom = new mongoose.model('cupons', new mongoose.Schema({
  codigo: String,
  nome: String,
  sobrenome: String,
  email: { type: String, unique: true },
  idade: Number,
  receita: { type: String, enum: ['1', '2', '3', '4'] },
  loja: { type: mongoose.Schema.Types.ObjectId, ref: 'lojas' },
  valido: {type: Boolean, default: true},
  iniciado: {type: Boolean, default: false},
  facebook: String,
}, {
    timestamps: true,
  }));

module.exports = Cupom;