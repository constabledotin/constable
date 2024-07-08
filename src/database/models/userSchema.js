import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  current_level: { type: Number, default: 1 },
  correct_streak: { type: Number, default: 0 },
  incorrect_streak: { type: Number, default: 0 },
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
