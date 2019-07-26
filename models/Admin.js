const mongoose = require('mongoose');

const Admin = new mongoose.model('admins', new mongoose.Schema({
  username: String,
  password: String,
}, {
    timestamps: true,
  }));

module.exports = Admin;