import { ObjectId } from "mongodb"
import { Database, Listing } from "../../../lib/types"

const getAllListings = async (
  _root: undefined,
  _args: {}, { db }: { db: Database }): Promise<Listing[]> => {
  return await db.listings.find({}).toArray()
}
const deleteListing = async (
  _parent: undefined,
  { id }: { id: string },
  { db }: { db: Database }): Promise<Listing> => {
  const deleteResult = await db.listings.findOneAndDelete({ _id: new ObjectId(id) })
  if (!deleteResult.value)
    throw new Error('failed to delete listing')
  return deleteResult.value
}

export const listingsResolvers = {
  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
  },
  Query: {
    listings: getAllListings
  },
  Mutation: {
    deleteListing: deleteListing
  }
}
