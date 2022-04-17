import express from 'express';
import UserController from '../controllers/user.controller';

const UserRouter = express.Router();

UserRouter.get('/cuisine', UserController.getUsersFromCuisine);

export default UserRouter;
