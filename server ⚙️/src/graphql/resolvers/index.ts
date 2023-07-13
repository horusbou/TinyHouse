import merge from "lodash.merge";
import { ViewerResolvers } from './Viewer'
import { ListingResolvers } from "./Listing";
import { UserResolvers } from "./User"
import { BookingResolver } from "./Booking";

export const resolvers = merge(ViewerResolvers, ListingResolvers, UserResolvers,BookingResolver)
