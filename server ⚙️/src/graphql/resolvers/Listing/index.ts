import { ObjectId } from "mongodb";
import { Database, Listing, User } from "../../../lib/types";
import { authorize } from "../../../lib/utils";
import { ListingArgs,ListingBookingsArgs,ListingBookingsData, ListingsFilter, ListingsArgs, ListingsData } from "./types";
import { Request } from "express";

export const ListingResolvers = {
    Query:{
        listing:async (_root:undefined,{id}:ListingArgs,{db,req}:{db:Database;req:Request}):Promise<Listing>=>{
            try {
                const listing = await db.listings.findOne({_id:new ObjectId(id)})
                if(!listing)
                    throw new Error("listing can't be found");

                const viewer = await authorize(db,req);

                if(viewer && viewer._id===listing.host)
                    listing.authorized = true;

                return listing;

            } catch (error) {
                throw new Error(`failed to query listing: ${error}`)
            }
        },
        listings:async (_root:undefined,{filter,limit,page}:ListingsArgs,{db}:{db:Database}):Promise<ListingsData|null>=>{
            try {
                const data: ListingsData = {
                  total: 0,
                  result: []
                }

                let cursor = db.listings.find({});
                if(filter && filter === ListingsFilter.PRICE_HIGH_TO_LOW){
                    cursor = cursor.sort({price:1}); // 1 === asc
                }
                else if(filter && filter=== ListingsFilter.PRICE_LOW_TO_HIGH){
                    cursor = cursor.sort({price:-1}); // -1 === desc
                }

                data.total = await cursor.count()
                cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
                cursor = cursor.limit(limit);

                data.result = await cursor.toArray();

                return data;
              } catch (error: any) {
                throw new Error("Failed to query user listings" + error.toString())
              }
        }
    },
    Listing:{
        id:(listing:Listing):string=>{
            return listing._id.toString();

        },
        host:async (listing:Listing,_args:{},{db}:{db:Database}):Promise<User>=>{
            const host = await db.users.findOne({_id:listing.host})
            if(!host)
                throw new Error("host can't be found");
            return host;
        },
        bookingsIndex:(listing:Listing):string=>{
            return JSON.stringify(listing.bookingsIndex);
        },
        bookings: async (listing: Listing, { limit, page }: ListingBookingsArgs, { db }: { db: Database }): Promise<ListingBookingsData | null> => {
            try {
              if (!listing.authorized)
                return null;
              const data: ListingBookingsData = {
                total: 0,
                result: []
              }

              let cursor = db.bookings.find({
                _id: { $in: listing.bookings }
              });

              data.total = await db.bookings.countDocuments(cursor);
              cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0)
              cursor = cursor.limit(limit);

              data.result = await cursor.toArray()
              return data;
            } catch (error: any) {
              throw new Error("Failed to query listing booking" + error.toString())
            }
          },
    }

};
