import React from "react";
import { HomeHero, HomeListings,HomeListingsSkeleton } from "./components";
import { Col, Layout, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  Listings as ListingsData,
  ListingsVariables,
} from "../../lib/graphql/queries/Listings/__generated__/Listings";
import { LISTINGS, ListingsFilter } from "../../lib/graphql";

import mapBackground from "./assets/map-background.jpg";
import sanFransiscoImage from "./assets/san-fransisco.jpg";
import cancunImage from "./assets/cancun.jpg";

import { displayErrorMessage } from "../../lib/components/utils";
import { Link } from "react-router-dom";

const { Content } = Layout;
const { Paragraph, Title } = Typography;

export const Home = () => {
  const history = useNavigate();
  const PAGE_LIMIT = 4;
  const PAGE_NUMBER = 1;
  const { loading, data } = useQuery<ListingsData, ListingsVariables>(
    LISTINGS,
    {
      variables: {
        filter: ListingsFilter.PRICE_HIGH_TO_LOW,
        limit: PAGE_LIMIT,
        page: PAGE_NUMBER,
      },
    }
  );

  const onSearch = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue) {
      history(`/listings/${trimmedValue}`);
    } else {
      displayErrorMessage("Please enter a valid search!");
    }
  };

  const renderListingsSection = () => {
    if (loading) return <HomeListingsSkeleton/>;
    else if (data) {
        console.log("data=>",data)
      return (
        <HomeListings
          title="Premium Listings"
          listings={data?.listings?.result}
        />
      );
    }
    return null;
  };

  return (
    <Content
      className="home"
      style={{ backgroundImage: `url(${mapBackground})` }}
    >
      <HomeHero onSearch={onSearch} />
      <div className="home__cta-section">
        <Title level={2} className="home__cta-section-title">
          Your guide for all things rental
        </Title>
        <Paragraph>
          Helping you make the best decisions in renting your last minute
          locations
        </Paragraph>
        <Link
          className="ant-btn ant-btn-primary ant-btn-lg home__cta-section-button"
          to="/listing/united%20states"
        >
          Popular listings in the United States
        </Link>
      </div>

      {renderListingsSection()}

      <div className="home__listings">
        <Title level={4} className="home__listings-title">
          Listings of any kind
        </Title>
        <Row gutter={12}>
          <Col xs={24} sm={12}>
            <Link to="/listings/san%20fransisco">
              <div className="home__listings-img-cover">
                <img
                  src={sanFransiscoImage}
                  alt="San Fransisco"
                  className="home__listings-img"
                />
              </div>
            </Link>
          </Col>
          <Col xs={24} sm={12}>
            <Link to="/listings/cancun">
              <div className="home__listings-img-cover">
                <img
                  src={cancunImage}
                  alt="Cancun"
                  className="home__listings-img"
                />
              </div>
            </Link>
          </Col>
        </Row>
      </div>
    </Content>
  );
};
