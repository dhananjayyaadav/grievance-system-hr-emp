const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'hr'], required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
