import React from "react";
import { useMutation, useQuery, gql } from "@apollo/client"
import { Listings as ListingsData } from './__generated__/Listings'
import { DeleteListing as DeleteListingData, DeleteListingVariables } from "./__generated__/DeleteListing"
import './styles/Listings.css'
import { List, Avatar, Button, Spin } from "antd"
import { ListingsSkeleton } from './componenet'

const LISTINGS = gql`
query Listings{
  listings{
  id
  title
  image
  address
  price
  }
}
`
const DELETE_LISTING = gql`
mutation DeleteListing($id:ID!){
  deleteListing(id:$id){
  id
  title
  }
}
`

interface Props {
  title: string
}

export const Listings = ({ title }: Props) => {
  const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS)
  const [
    deleteListing,
    {
      loading: deleteListingLoading,
      error: deleteListingError
    }
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING)

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } })
    refetch()
  }

  const listings = data ? data.listings : null
  const listingList = listings ? (<List
    itemLayout="horizontal"
    dataSource={listings}
    renderItem={(listing) => (
      <List.Item actions={[<Button type="primary" onClick={() => handleDeleteListing(listing.id)}>Delete</Button>]}>
        <List.Item.Meta
          title={listing.title}
          description={listing.address}
          avatar={<Avatar src={listing.image} shape="square" size={48} />}
        />
      </List.Item>
    )}
  />) : null

  if (error)
    return <h1>Error</h1>

  if (true || loading)
    return (<div className="listings">
      <ListingsSkeleton title={title} />
    </div>)
  const deleteListingErrorMessage = deleteListingError ? <h4>Deletion failed</h4> : null

  return <div className="listings">
    <Spin spinning={deleteListingLoading}>
      <h2>{title}</h2>
      {listingList}
      {deleteListingErrorMessage}
    </Spin>
  </div>
}
