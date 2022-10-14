interface Listing {
  id: string
  title: string
  image: string
  address: string
  price: number
  numOfBeds: number
  numOfGuests: number
  numOfBaths: number
  rating: number
}

export interface ListingsData {
  listings: Listing[]
}
export interface DeleteListingData {
  deleteListing: Listing
}
export interface DeleteListingVariable {
  id: string
}
