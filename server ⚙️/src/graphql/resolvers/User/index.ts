import { UserArgs, UserBookingsArgs, UserBookingsData, UserListingsData, UserListingsArgs } from "./types";
import { Database, User } from "../../../lib/types";
import { authorize } from "../../../lib/utils"
import { Request } from "express";
import { Collection } from "mongodb";

export const UserResolvers = {
  Query: {
    user: async (_root: undefined, { id }: UserArgs, { db, req }: { db: Database, req: Request }): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: id })
        if (!user)
          throw new Error("user can't be found");
        const viwer = await authorize(db, req);
        if (viwer && viwer._id === user._id) {
          user.authorized = true;
        }
        return user;
      } catch (error) {
        throw new Error('Failed to query user:' + error)
      }
    }
  },
  User: {
    id: (user: User): string => user._id,
    hasWallet: (user: User): boolean => Boolean(user.walletId),
    income: (user: User): number | null => user.authorized ? user.income : null,
    bookings: async (user: User, { limit, page }: UserBookingsArgs, { db }: { db: Database }): Promise<UserBookingsData | null> => {
      try {
        if (!user.authorized)
          return null;
        const data: UserBookingsData = {
          total: 0,
          result: []
        }

        let cursor = db.bookings.find({
          _id: { $in: user.bookings }
        });

        data.total = await db.bookings.countDocuments(cursor);
        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0)
        cursor = cursor.limit(limit);

        data.result = await cursor.toArray()
        return data;
      } catch (error: any) {
        throw new Error("Failed to query user booking" + error.toString())
      }
    },
    listings: async (user: User, { page, limit }: UserListingsArgs, { db }: { db: Database }): Promise<UserListingsData | null> => {
      try {
        const data: UserListingsData = {
          total: 0,
          result: []
        }

        let cursor = db.listings.find({
          _id: { $in: user.listings }
        });


        data.total = await cursor.count()
        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.result = await cursor.toArray();


        return data;
      } catch (error: any) {
        throw new Error("Failed to query user listings" + error.toString())
      }
    }
  }
}
