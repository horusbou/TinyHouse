import merge from "lodash.merge";
import { viewerResolvers } from './Viewer'
import { ListingsResolvers } from "./Listings";
export const resolvers = merge(viewerResolvers,ListingsResolvers)
