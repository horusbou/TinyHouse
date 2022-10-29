import merge from "lodash.merge";
import { ViewerResolvers } from './Viewer'
import { ListingsResolvers } from "./Listings";
import { UserResolvers } from "./User"
export const resolvers = merge(ViewerResolvers, ListingsResolvers, UserResolvers)
