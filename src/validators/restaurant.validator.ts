import Joi from '@hapi/joi';
import validateJoiResults from '../helpers/validateJoiResults';
import {
  RestaurantFilters,
  RestaurantNearbyOptions,
  RestuarantInput,
} from '../models/restuarant.model';

const requiredString = Joi.string().required();

const mongoId = Joi.string().regex(/^[0-9a-fA-F]{24}$/u);

const requiredMongoId = mongoId.required();

const addRestaurantSchema = Joi.object().keys({
  name: requiredString,
  cuisine: requiredString,
  longitude: Joi.number().required().max(180).min(-180),
  latitude: Joi.number().required().max(90).min(-90),
  owner: requiredMongoId,
});

const getNearbyRestaurantsSchema = Joi.object().keys({
  longitude: Joi.number().required().max(180).min(-180),
  latitude: Joi.number().required().max(90).min(-90),
  maxDistance: Joi.number().required(),
});

const cuisineSchema = Joi.object().keys({
  cuisine: Joi.string().required(),
});

const getRestaurantsSchema = Joi.object().keys({
  cuisine: Joi.string(),
  slug: Joi.string(),
  _id: mongoId,
});

export default class RestaurantValidator {
  static validateAddRestaurant(restaurant: RestuarantInput) {
    const validationResult = addRestaurantSchema.validate(restaurant);

    validateJoiResults(validationResult);
  }

  static validateGetNearbyRestaurants(nearbyOptions: RestaurantNearbyOptions) {
    const validationResult = getNearbyRestaurantsSchema.validate(nearbyOptions);

    validateJoiResults(validationResult);
  }

  static validateGetRestaurants(restaurantFilters: RestaurantFilters) {
    const validationResult = getRestaurantsSchema.validate(restaurantFilters);

    validateJoiResults(validationResult);
  }

  static validateCuisine(cuisine: string) {
    const validationResult = cuisineSchema.validate({ cuisine });

    validateJoiResults(validationResult);
  }
}
