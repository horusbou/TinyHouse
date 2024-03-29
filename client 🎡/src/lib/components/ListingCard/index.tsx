import React from "react";
import { Card, Typography } from "antd";
import { Link } from "react-router-dom";
import Icon from "@ant-design/icons/lib/components/Icon";
import { iconColor, formatListingPrice } from "../utils";
interface Props {
  listing: {
    id: string;
    title: string;
    image: string;
    address: string;
    price: number;
    numOfGuests: number;
  };
}

const { Text, Title } = Typography;

export const ListingCard = ({ listing }: Props) => {
  const { id, title, image, address, price, numOfGuests } = listing;

  return (
    <Link to={`/listing/${id}`}>
      <Card
        hoverable
        cover={
          <div
            className="listing-card__cover-img"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        }
      >
        <div className="listing-card__details">
          <div className="listing-card__description">
            <Title level={4} className="listing-card__price">
              {formatListingPrice(price)}
              <span>/day</span>
            </Title>

            <Text strong className="listing-card__title">
              {title}
            </Text>

            <Text className="listing-card__address">{address}</Text>

            <div className="listing-card__dimensions listing-card__dimensions--guests">
              <Icon type="user" style={{ color: iconColor }} />
              <Text>{numOfGuests} guests</Text>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
