import { ObjectId } from "mongodb";
import { Database } from "../../../lib/types";

export const ListingsResolvers = {
    Query:{
        listings: (_root:undefined,_args:{},{db}:{db:Database}) => {
            return db.listings.find().toArray();
        }
    },
    Mutation: {
        deleteListing: async(_root: undefined, { id }: { id: string }, { db }: { db: Database }) => {
            await db.listings.deleteOne({_id:new ObjectId(id)})
            throw new Error("failed to deleted listing");
        }
    }
};
