import { Container } from "react-bootstrap";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderDetailsProvider from "./context/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import { useState } from "react";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

function App() {
  const [orderPhase, setOrderPhase] = useState("entry");
  let Component;
  switch (orderPhase) {
    case "entry":
      Component = OrderEntry;
      break;
    case "summary":
      Component = OrderSummary;
      break;
    case "confirm":
      Component = OrderConfirmation;
      break;
    default:
      break;
  }
  const handleNext = (nextPhase) => setOrderPhase(nextPhase);
  return (
    <OrderDetailsProvider>
      <Container>{<Component handleNext={handleNext} />}</Container>
    </OrderDetailsProvider>
  );
}

export default App;
