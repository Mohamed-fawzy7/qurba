import express from 'express';
import RestaurantRouter from './restaurants.router';
import UserRouter from './user.router';

const MainRouter = express.Router();

MainRouter.use('/restaurants', RestaurantRouter);
MainRouter.use('/users', UserRouter);

export default MainRouter;
