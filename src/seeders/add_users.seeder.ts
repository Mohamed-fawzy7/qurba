import UserModel, { UserInput } from '../models/user.model';
import dotenv from 'dotenv';
dotenv.config({
  path: `${__dirname}/../../.env`,
});
import '../config/db';

const users: UserInput[] = [
  {
    name: 'Mohamed Fawzy',
    favoriteCuisines: ['indian'],
  },
  {
    name: 'Mohamed Heiba',
    favoriteCuisines: ['burger'],
  },
];

async function addUsers(): Promise<void> {
  await UserModel.insertMany(users);
}

addUsers();
