import { UserFilters } from '../models/user.model';
import UserRepo from '../repos/user.repo';

export default class UserService {
  static async getUser(filters: UserFilters) {
    const user = await UserRepo.getUser(filters);

    return user;
  }

  static async getUsersFromCuisine(cuisine: string) {
    const users = await UserRepo.getUsersFromCuisine(cuisine);

    return users;
  }
}
