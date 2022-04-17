import UserModel, { UserFilters } from '../models/user.model';

export default class UserRepo {
  static async getUser(filters: UserFilters) {
    const user = await UserModel.findOne(filters);

    return user;
  }

  static async getUsersFromCuisine(cuisine: string) {
    const users = await UserModel.aggregate([
      {
        //to get starter placeholder
        $limit: 1,
      },
      {
        //remove everything from the document
        $project: {
          _id: '$$REMOVE',
        },
      },
      {
        //look up from restaurant which have the cuisine
        $lookup: {
          from: 'restuarants',
          as: 'restuarants_owner',
          pipeline: [
            {
              $match: {
                cuisine: cuisine,
              },
            },
          ],
        },
      },
      {
        //look up from users who have the cuisine in their favorites
        $lookup: {
          from: 'users',
          as: 'cuisine_favorites',
          pipeline: [
            {
              $match: {
                favoriteCuisines: cuisine,
              },
            },
          ],
        },
      },
      {
        //project both restuarants_owner and cuisine_favorites
        $project: {
          union: {
            $concatArrays: ['$restuarants_owner', '$cuisine_favorites'],
          },
        },
      },
      {
        $unwind: '$union',
      },
      {
        $replaceRoot: {
          newRoot: '$union',
        },
      },
      {
        //look up owners in restaurants
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
      //project name and _id if user field exists
      {
        $project: {
          _id: false,
          name: {
            $ifNull: ['$user.name', '$name'],
          },
          userid: {
            $ifNull: ['$user._id', '$_id'],
          },
        },
      },
      //to distinct user, in case of user is owner and have favourite cuisine
      {
        $group: {
          _id: '$userid',
          name: {
            $first: '$name',
          },
        },
      },
    ]);

    return users;
  }
}
