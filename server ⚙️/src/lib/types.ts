import { ObjectId, Collection } from 'mongodb'

export enum ListingType {
  House = 'HOUSE',
  Apartment = "APARTMENT"
}
export interface BookingsIndexYear {
  [k: string]: BookingsIndexMonth;
}
export interface BookingsIndexMonth {
  [M: string]: boolean
}
export interface BookingsIndex {
  [k: string]: BookingsIndexYear
}

export interface Listing {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
  host: string;
  type: ListingType;
  address: string;
  country: string;
  admin: string;
  city: string;
  bookings: ObjectId[];
  bookingsIndex: BookingsIndex;
  price: number;
  numOfGuests: number;
}

export interface User {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  walletId?: string;
  income: number;
  bookings: ObjectId[];
  listings: ObjectId[];
}

export interface Booking {
  _id: ObjectId;
  listing: ObjectId;
  tenant: string;
  checkIn: string;
  checkOut: string;
}

export interface Database {
  listings: Collection<Listing>;
  users: Collection<User>;
  bookings: Collection<Booking>;
}
