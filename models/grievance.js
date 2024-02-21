const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const grievanceSchema = new Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['open', 'resolved'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Grievance', grievanceSchema);
