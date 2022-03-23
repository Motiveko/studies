import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { pricePerItem } from "../constants/index";

const OrderDetails = createContext();

function formatCurrency(amount) {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: "2",
  }).format(amount);
}

export const useOrderDetails = () => {
  const context = useContext(OrderDetails);
  if (!context) {
    throw new Error(
      "OrderDetailsProvider 아래에서만 이 훅을 사용할 수 있습니다."
    );
  }

  return context;
};

export default function OrderDetailsProvider({ children, ...props }) {
  const [optionCount, setOptionCount] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  const calculateSubtotal = (optionType, optionCounts) => {
    let optionCount = 0;
    for (let count of optionCounts[optionType].values()) {
      optionCount += count;
    }
    return optionCount * pricePerItem[optionType];
  };
  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCount);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCount);
    const grandTotal = formatCurrency(scoopsSubtotal + toppingsSubtotal);
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal,
    });
  }, [optionCount]);

  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionCount = { ...optionCount };

      const optionCountMap = newOptionCount[optionType];
      optionCountMap.set(itemName, parseInt(newItemCount));
      setOptionCount(newOptionCount);
    };
    return [{ ...optionCount, totals }, updateItemCount];
  }, [optionCount, totals]);

  return (
    <OrderDetails.Provider value={value} {...props}>
      {children}
    </OrderDetails.Provider>
  );
}
