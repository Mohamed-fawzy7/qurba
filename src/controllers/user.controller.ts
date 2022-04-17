import { Request, Response } from 'express';
import formulateErrorResponse from '../helpers/formulateErrorResponse';
import UserService from '../services/user.service';
import RestaurantValidator from '../validators/restaurant.validator';

export default class UserController {
  static async getUsersFromCuisine(req: Request, res: Response) {
    try {
      const cuisine = req.query.cuisine as string;

      RestaurantValidator.validateCuisine(cuisine);

      const usersFromCuisine: any = await UserService.getUsersFromCuisine(
        cuisine
      );

      res.status(201).json({
        status: true,
        statusCode: 201,
        data: usersFromCuisine,
      });
    } catch (error) {
      const errorResponse = formulateErrorResponse(error);
      res.status(errorResponse.statusCode).json(errorResponse);
    }
  }
}
