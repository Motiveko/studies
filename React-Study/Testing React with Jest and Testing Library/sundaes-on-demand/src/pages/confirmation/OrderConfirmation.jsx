import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ handleNext }) {
  const [{ scoops, toppings }, _, resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);
  const handleClick = useCallback(() => {
    resetOrder();
    handleNext("entry");
  }, [handleNext, resetOrder]);
  useEffect(() => {
    axios
      .post("http://localhost:3030/orders", { scoops, toppings })
      .then(({ data: { orderNumber } }) => {
        setOrderNumber(orderNumber);
      })
      .catch((err) => {
        setError(true);
      });
  }, [scoops, toppings]);
  if (error) {
    return <AlertBanner />;
  }
  if (orderNumber) {
    return (
      <div>
        <h2>Thank you!</h2>
        <p> order number is {orderNumber} </p>
        <Button onClick={handleClick}>new order</Button>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
}
