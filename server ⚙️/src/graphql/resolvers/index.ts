import merger from "lodash.merge"
import {listingsResolvers} from "./Listing"

export const resolvers = merger(listingsResolvers)
