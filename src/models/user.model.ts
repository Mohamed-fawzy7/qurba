import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  favoriteCuisines: string[];
}

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

export default User;
