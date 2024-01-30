import mongoose from 'mongoose';

const userModel = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  advice: {
    id: { type: String },
    advice: { type: String },
    generatedAt: { type: String },
  },
  createdAt: { type: String, default: new Date().toLocaleString() },
});

const User = mongoose.model('User', userModel);

export default User;
