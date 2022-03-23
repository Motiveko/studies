import { useOrderDetails } from "../../context/OrderDetails";
import Options from "./Options";

export default function OrderEntry() {
  const [{ totals }] = useOrderDetails();

  return (
    <div>
      <Options optionType={"scoops"} />
      <Options optionType={"toppings"} />
      <h2>Grand total: {totals.grandTotal}</h2>
    </div>
  );
}
