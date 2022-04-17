import express from 'express';
import RestaurantController from '../controllers/restaurant.controller';

const RestaurantRouter = express.Router();

RestaurantRouter.post('/', RestaurantController.addRestaurant);
RestaurantRouter.get('/nearby', RestaurantController.getNearbyRestaurants);
RestaurantRouter.get('/one', RestaurantController.getRestaurant);
RestaurantRouter.get('/', RestaurantController.getRestaurants);

export default RestaurantRouter;
