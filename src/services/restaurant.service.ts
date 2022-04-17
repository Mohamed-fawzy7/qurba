import {
  RestaurantFilters,
  RestaurantNearbyOptions,
  RestuarantInput,
} from '../models/restuarant.model';
import slugify from 'slugify';
import RestaurantRepo from '../repos/restaurant.repo';
import CustomError from '../helpers/customError';
import UserService from './user.service';

export default class RestaurantService {
  static async addRestaurant(restaurantInput: RestuarantInput) {
    const { name, owner } = restaurantInput;
    const slug = slugify(name);

    const [isOwnerFound, isSlugExist] = await Promise.all([
      UserService.getUser({ _id: owner }),
      RestaurantService.getRestaurant({ slug }),
    ]);

    if (!isOwnerFound) {
      throw new CustomError(
        {
          code: 'R001',
          message: `owner doesn't exist`,
        },
        400
      );
    }

    if (isSlugExist) {
      throw new CustomError(
        {
          code: 'R002',
          message: 'slug already exists',
        },
        400
      );
    }

    await RestaurantRepo.addRestaurant({ ...restaurantInput, slug });
  }

  static async getRestaurant(filters: RestaurantFilters) {
    const restaurant = await RestaurantRepo.getRestaurant(filters);

    return restaurant;
  }

  static async getRestaurants(filters: RestaurantFilters) {
    const restaurants = await RestaurantRepo.getRestaurants(filters);

    return restaurants;
  }

  static async getNearbyRestaurants(nearbyOptions: RestaurantNearbyOptions) {
    const restaurants = await RestaurantRepo.getNearbyRestaurants(
      nearbyOptions
    );

    return restaurants;
  }
}
