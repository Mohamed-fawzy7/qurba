import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  favoriteCuisines: [
    {
      type: String,
      lowercase: true,
    },
  ],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
