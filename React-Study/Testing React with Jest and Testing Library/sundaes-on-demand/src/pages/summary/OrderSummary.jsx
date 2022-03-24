import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../context/OrderDetails";
import axios from "axios";

export default function OrderSummary({ handleNext }) {
  const [{ scoops, toppings, totals }] = useOrderDetails();
  const scoopsList = [...scoops.entries()].map(([name, count]) => (
    <li key={name}>
      {count} {name}
    </li>
  ));
  const toppingsList = [...toppings.entries()].map(([name, count]) => {
    if (count === 0) return null;
    return <li key={name}>{name}</li>;
  });

  return (
    <>
      <h2>Order Summary</h2>
      <h3>Scoops: {totals.scoops}</h3>
      <ul>{scoopsList}</ul>
      <h3>Toppings: {totals.toppings}</h3>
      <ul>{toppingsList}</ul>
      <h3>Total {toppings.grandTotal}</h3>
      <SummaryForm onNext={() => handleNext("confirm")} />
    </>
  );
}
