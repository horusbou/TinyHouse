// import { gql } from "apollo-server-express"

// export const typeDefs = gql`

// enum ListingType{
//     APARTMENT
//     HOUSE
// }

// type Listing {
//     id: ID!
//     title: String!
//     image: String!
//     address: String!
//     price: Int!
//     numOfGuests: Int!
//     host:User!
//     type:ListingType
//     city:String!
//     bookings(limit:Int!,page:Int!):Bookings
//     bookingsIndex:String!
// }

// type Booking{
//    id:ID!
//    listing:Listing!
//    tenant:User!
//    checkIn:String!
//    checkOut:String!
// }

// type Bookings{
//     total:Int!
//     result:[Booking!]!
// }
// type Listings{
//     total:Int!
//     result:[Listing!]!
// }

// type User{
//   id: String!
//   name: String!
//   avatar: String!
//   contact: String!
//   hasWallet: Boolean!
//   income: Int
//   bookings(limit:Int!,page:Int!): Bookings
//   listings(limit:Int!,page:Int!): Listings!
// }

// type Viewer{
//   id:ID
//   token:String
//   avatar:String
//   hasWallet:Boolean
//   didRequest:Boolean!
// }
// type Query{
//   authUrl:String!
//   listings: [Listing!]!
//   user(id:ID!):User!
// }

// input LoginInput {
//   code:String!
// }

// type Mutation{
//   logIn(input:LoginInput):Viewer!
//   logOut: Viewer!
//   deleteListing(id: ID!): Listing!
// }
// `


import { gql } from "apollo-server-express";

export const typeDefs = gql`
  enum ListingType {
    APARTMENT
    HOUSE
  }

  type Listing {
    id: ID!
    title: String!
    image: String!
    address: String!
    price: Int!
    numOfGuests: Int!
    host: User!
    type: ListingType
    city: String!
    bookings(limit: Int!, page: Int!): Bookings
    bookingsIndex: String!
  }

  type Booking {
    id: ID!
    listing: Listing!  # <-- Ensure the listing field is included
    tenant: User!
    checkIn: String!
    checkOut: String!
  }

  type Bookings {
    total: Int!
    result: [Booking!]!
  }

  type Listings {
    total: Int!
    result: [Listing!]!
  }

  type User {
    id: String!
    name: String!
    avatar: String!
    contact: String!
    hasWallet: Boolean!
    income: Int
    bookings(limit: Int!, page: Int!): Bookings
    listings(limit: Int!, page: Int!): Listings!
  }

  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

  type Query {
    authUrl: String!
    # listings: [Listing!]!
    listing(id:ID!):Listing!
    user(id: ID!): User!
  }

  input LoginInput {
    code: String!
  }

  type Mutation {
    logIn(input: LoginInput): Viewer!
    logOut: Viewer!
    deleteListing(id: ID!): Listing!
  }
`;
