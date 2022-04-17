import RestuarantModel, {
  RestaurantFilters,
  RestaurantNearbyOptions,
  RestuarantDocument,
  RestuarantInput,
} from '../models/restuarant.model';

export default class RestaurantRepo {
  static async getRestaurant(filters: RestaurantFilters) {
    const restaurant = (await RestuarantModel.findOne(
      filters
    )) as RestuarantDocument | null;

    return restaurant;
  }

  static async getRestaurants(filters: RestaurantFilters) {
    const restaurants = (await RestuarantModel.find(
      filters
    )) as RestuarantDocument[];

    return restaurants;
  }

  static async addRestaurant(restaurantInput: RestuarantInput) {
    const { name, slug, cuisine, longitude, latitude, owner } = restaurantInput;
    const restaurant = new RestuarantModel({
      name,
      owner,
      slug,
      cuisine,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    });

    const addedRestaurant = (await restaurant.save()) as RestuarantDocument;

    return addedRestaurant;
  }

  static async getNearbyRestaurants(nearbyOptions: RestaurantNearbyOptions) {
    const { maxDistance, longitude, latitude } = nearbyOptions;

    const restaurants = await RestuarantModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: maxDistance,
        },
      },
    });

    return restaurants;
  }
}
