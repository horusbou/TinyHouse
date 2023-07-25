import { Booking, Listing } from "../../../lib/types";

export interface ListingArgs{
     id:string;
}

export interface ListingBookingsArgs{
    limit:number;
    page:number;
}

export interface ListingBookingsData{
    total:number;
    result:Booking[];
}
export enum ListingsFilter{
    PRICE_LOW_TO_HIGH='PRICE_LOW_TO_HIGH',
    PRICE_HIGH_TO_LOW='PRICE_LOW_TO_HIGH'
}

export interface ListingsArgs{
    limit:number;
    page:number;
    filter:ListingsFilter;
}

export interface ListingsData{
    total:number;
    result: Listing[];
}
