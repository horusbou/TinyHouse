import React from "react";
import { Button, Card, Divider, Typography, DatePicker } from "antd";
import {
  formatListingPrice,
  displayErrorMessage,
} from "../../../../lib/components/utils";
import moment, { Moment } from "moment";

const { Paragraph, Title } = Typography;

interface Props {
  price: number;
  checkInDate: Moment | null;
  checkOutDate: Moment | null;
  setCheckInDate: (checkInDate: Moment | null) => void;
  setCheckOutDate: (checkOutDate: Moment | null) => void;
}

const disabledDate = (currentDate: Moment) => {
  if (currentDate) {
    const dateIsBeforeEndOfDay = currentDate.isBefore(moment().endOf("day"));
    return dateIsBeforeEndOfDay;
  } else {
    return false;
  }
};

export const ListingCreateBooking = ({
  price,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
}: Props) => {
  const verifyAndSetCheckOutDate = (selectedCheckOutDate: Moment | null) => {
    if (checkInDate && selectedCheckOutDate) {
      if (moment(selectedCheckOutDate).isBefore(checkInDate, "days")) {
        return displayErrorMessage(
          "you cannot book date of check out to be prior to check in!"
        );
      }
    }
    setCheckOutDate(selectedCheckOutDate);
  };
  const checkOutInputDisabled = !checkInDate;
  const buttonDisabled = !checkInDate || !checkOutDate;

  return (
    <div className="listing-booking">
      <Card className="listing-booking__card">
        <div>
          <Paragraph>
            <Title level={2} className="listing-booking__card-title">
              {formatListingPrice(price)}
              <span>/day</span>
            </Title>
          </Paragraph>
          <Divider />
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check In</Paragraph>
            <DatePicker
              format={"YYYY/MM/DD"}
              disabledDate={disabledDate}
              value={checkInDate}
              onChange={setCheckInDate}
              onOpenChange={() => setCheckOutDate(null)}
            />
          </div>
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check Out</Paragraph>
            <DatePicker
              disabledDate={disabledDate}
              format={"YYYY/MM/DD"}
              value={checkOutDate}
              disabled={checkOutInputDisabled}
              onChange={verifyAndSetCheckOutDate}
            />
          </div>
        </div>
        <Divider />
        <Button
          disabled={buttonDisabled}
          size="large"
          type="primary"
          className="listing-booking__card-cta"
        >
          Request to book
        </Button>
      </Card>
    </div>
  );
};
