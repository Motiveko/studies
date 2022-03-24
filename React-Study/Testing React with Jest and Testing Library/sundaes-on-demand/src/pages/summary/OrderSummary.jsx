import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../context/OrderDetails";
import axios from "axios";
import { useMemo } from "react";

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
  const toppingOrderExists = useMemo(() => {
    const totalToppingsCount = [...toppings.values()].reduce(
      (acc, count) => acc + count,
      0
    );
    return totalToppingsCount > 0;
  }, [toppings]);
  return (
    <>
      <h2>Order Summary</h2>
      <h3>Scoops: {totals.scoops}</h3>
      <ul aria-label="scoop-list">{scoopsList}</ul>
      {toppingOrderExists && (
        <>
          <h3>Toppings: {totals.toppings}</h3>
          <ul aria-label="topping-list">{toppingsList}</ul>
        </>
      )}
      <h3>Total {toppings.grandTotal}</h3>
      <SummaryForm onNext={() => handleNext("confirm")} />
    </>
  );
}
