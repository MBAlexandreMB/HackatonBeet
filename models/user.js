const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
  name: String,
  status: Boolean,
  confirmationCode: {type: String, unique: true},
  email: {type: String, unique: true},
  budget: Number,
  facebookId: String,
  picture: String,
  interest: { type: Schema.Types.ObjectId, ref: 'Interesse' },
  roteiros: [{ type: Schema.Types.ObjectId, ref: 'Roteiro' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
