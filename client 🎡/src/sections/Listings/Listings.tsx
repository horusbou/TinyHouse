import React from "react";
import { useQuery } from "@apollo/client";

import "./styles/Listings.css";
import { Spin } from "antd";
import { ListingsSkeleton } from "./componenet";
import { LISTINGS } from "../../lib/graphql";
import { ListingsData } from "./types";

// const DELETE_LISTING = gql`
//   mutation DeleteListing($id: ID!) {
//     deleteListing(id: $id) {
//       id
//       title
//     }
//   }
// `;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const { loading, error } = useQuery<ListingsData>(LISTINGS);

  //   const handleDeleteListing = async (id: string) => {
  //     await deleteListing({ variables: { id } });
  //     refetch();
  //   };

  //   const listings = data ? data.listings : null;
  //   const listingList = false ? (
  //     <List
  //       itemLayout="horizontal"
  //       dataSource={listings}
  //       renderItem={(listing) => (
  //         <List.Item
  //           actions={[
  //             <Button
  //               type="primary"
  //               onClick={() => handleDeleteListing(listing.id)}
  //             >
  //               Delete
  //             </Button>,
  //           ]}
  //         >
  //           <List.Item.Meta
  //             title={listing.title}
  //             description={listing.address}
  //             avatar={<Avatar src={listing.image} shape="square" size={48} />}
  //           />
  //         </List.Item>
  //       )}
  //     />
  //   ) : null;

  const listingList = null;

  if (error) return <h1>Error</h1>;

  if (loading)
    return (
      <div className="listings">
        <ListingsSkeleton title={title} />
      </div>
    );

  return (
    <div className="listings">
      <Spin spinning={false}>
        <h2>{title}</h2>
        <h1>TEST LISTINGS</h1>
        {listingList}
      </Spin>
    </div>
  );
};
