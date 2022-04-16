import mongoose, { Document } from 'mongoose';

export interface UserInput {
  name: string;
  favoriteCuisines: string[];
}

export interface IUser extends UserInput, Document {
  createdAt: Date;
  updatedAt: Date;
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

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
