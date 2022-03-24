import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";
import Options from "./Options";

export default function OrderEntry({ handleNext }) {
  const [{ totals }] = useOrderDetails();
  const { scoops, grandTotal } = totals;

  return (
    <div>
      <Options optionType={"scoops"} />
      <Options optionType={"toppings"} />
      <h2>Grand total: {grandTotal}</h2>
      <Button
        variant="primary"
        disabled={/\$0.00$/.test(scoops)}
        onClick={() => handleNext("summary")}
      >
        Order Sundae!
      </Button>
    </div>
  );
}
