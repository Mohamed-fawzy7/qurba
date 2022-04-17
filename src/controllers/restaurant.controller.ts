import { Request, Response } from 'express';
import {
  RestaurantFilters,
  RestaurantNearbyOptions,
  RestuarantInput,
} from '../models/restuarant.model';
import RestaurantService from '../services/restaurant.service';
import RestaurantValidator from '../validators/restaurant.validator';
import formulateErrorResponse from '../helpers/formulateErrorResponse';
import CustomError from '../helpers/customError';

export default class RestaurantController {
  static async addRestaurant(req: Request, res: Response) {
    try {
      const { name, cuisine, longitude, latitude, owner } = req.body;

      const restaurantBody: RestuarantInput = {
        name,
        cuisine,
        longitude,
        latitude,
        owner,
      };

      RestaurantValidator.validateAddRestaurant(restaurantBody);

      const addedRestaurant = await RestaurantService.addRestaurant(
        restaurantBody
      );

      res.status(201).json({
        status: true,
        statusCode: 201,
        message: 'restaurant added successfully',
        data: addedRestaurant,
      });
    } catch (error) {
      const errorResponse = formulateErrorResponse(error);
      res.status(errorResponse.statusCode).json(errorResponse);
    }
  }

  static async getNearbyRestaurants(req: Request, res: Response) {
    try {
      const maxDistanceInKM = parseInt(req.query.max as string) || 1;
      const longitude = parseInt(req.query.longitude as string);
      const latitude = parseInt(req.query.latitude as string);

      const nearbyOptions: RestaurantNearbyOptions = {
        longitude,
        latitude,
        maxDistance: maxDistanceInKM * 1000,
      };

      RestaurantValidator.validateGetNearbyRestaurants(nearbyOptions);

      const restaurants = await RestaurantService.getNearbyRestaurants(
        nearbyOptions
      );

      res.status(201).json({
        status: true,
        statusCode: 201,
        data: restaurants,
      });
    } catch (error) {
      const errorResponse = formulateErrorResponse(error);
      res.status(errorResponse.statusCode).json(errorResponse);
    }
  }

  static async getRestaurants(req: Request, res: Response) {
    try {
      const cuisine = req.query.cuisine as string;

      const filters: RestaurantFilters = {};
      if (cuisine) {
        filters.cuisine = cuisine;
      }

      RestaurantValidator.validateGetRestaurants(filters);

      const restaurants = await RestaurantService.getRestaurants(filters);

      res.status(201).json({
        status: true,
        statusCode: 201,
        data: restaurants,
      });
    } catch (error) {
      const errorResponse = formulateErrorResponse(error);
      res.status(errorResponse.statusCode).json(errorResponse);
    }
  }

  static async getRestaurant(req: Request, res: Response) {
    try {
      const slug = req.query.slug as string;
      const _id = req.query.id as string;

      console.log({ _id });

      const filters: RestaurantFilters = {};
      if (slug) {
        filters.slug = slug;
      }

      if (_id) {
        filters._id = _id;
      }

      RestaurantValidator.validateGetRestaurants(filters);

      if (!slug && !_id) {
        throw new CustomError(
          {
            message: 'please provide id or slug',
            code: 'R003',
          },
          400
        );
      }

      const restaurant = await RestaurantService.getRestaurant(filters);

      if (!restaurant) {
        throw new CustomError(
          {
            message: 'no restaurant found',
            code: 'R004',
          },
          400
        );
      }

      res.status(201).json({
        status: true,
        statusCode: 201,
        data: restaurant,
      });
    } catch (error) {
      const errorResponse = formulateErrorResponse(error);
      res.status(errorResponse.statusCode).json(errorResponse);
    }
  }
}
