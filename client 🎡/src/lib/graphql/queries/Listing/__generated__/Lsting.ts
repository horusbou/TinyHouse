/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingType } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: Lsting
// ====================================================

export interface Lsting_listing_host {
  __typename: "User";
  id: string;
  name: string;
  avatar: string;
  hasWallet: boolean;
}

export interface Lsting_listing_bookings_result_tenant {
  __typename: "User";
  id: string;
  name: string;
  avatar: string;
}

export interface Lsting_listing_bookings_result {
  __typename: "Booking";
  id: string;
  tenant: Lsting_listing_bookings_result_tenant;
  checkIn: string;
  checkOut: string;
}

export interface Lsting_listing_bookings {
  __typename: "Bookings";
  total: number;
  result: Lsting_listing_bookings_result[];
}

export interface Lsting_listing {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  host: Lsting_listing_host;
  type: ListingType | null;
  address: string;
  city: string;
  bookings: Lsting_listing_bookings | null;
  bookingsIndex: string;
  price: number;
  numOfGuests: number;
}

export interface Lsting {
  listing: Lsting_listing;
}

export interface LstingVariables {
  id: string;
  bookingsPage: number;
  limit: number;
}
