import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { LISTING } from "../../lib/graphql/queries";
import {
  Listing as ListingData,
  ListingVariables,
} from "../../lib/graphql/queries/Listing/__generated__/Listing";
import { useParams } from "react-router-dom";
import { PageSkeleton, ErrorBanner } from "../../lib/components";
import { Layout, Row, Col } from "antd";
import {
  ListingBookings,
  ListingDetails,
  ListingCreateBooking,
} from "./componenets";
import { Moment } from "moment";

export const Listing = () => {
  const { Content } = Layout;
  const params = useParams();
  const PAGE_LIMIT = 3;
  const [bookingsPage, setBookingsPage] = useState(1);
  const [checkInDate, setCheckInDate] = useState<Moment | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null);

  const { loading, data, error } = useQuery<ListingData, ListingVariables>(
    LISTING,
    {
      variables: {
        id: params.id ? params.id : "",
        limit: PAGE_LIMIT,
        bookingsPage,
      },
    }
  );

  if (loading) {
    return (
      <Content className="listings">
        <PageSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className="listings">
        <ErrorBanner description="this listing may not exist or we've ecountered an error. Please try again soon!" />
      </Content>
    );
  }
  const listing = data ? data.listing : null;
  const listingBookings = listing ? listing.bookings : null;

  const listingDetailsElement = listing ? (
    <ListingDetails listing={listing} />
  ) : null;

  const listingBookingsElement = listingBookings ? (
    <ListingBookings
      listingBookings={listingBookings}
      bookingsPage={bookingsPage}
      setBookingsPage={setBookingsPage}
      limit={PAGE_LIMIT}
    />
  ) : null;

  const listingCreateBooking = listing ? (
    <ListingCreateBooking
      price={listing.price}
      checkInDate={checkInDate}
      checkOutDate={checkOutDate}
      setCheckInDate={setCheckInDate}
      setCheckOutDate={setCheckOutDate}
    />
  ) : null;

  return (
    <Content className="listing">
      <Row gutter={24} justify={"space-between"}>
        <Col xs={24} lg={14}>
          {listingDetailsElement}
          {listingBookingsElement}
        </Col>
        <Col xs={24} lg={10}>
          {listingCreateBooking}
        </Col>
      </Row>
    </Content>
  );
};
