import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const BudgetsContext = React.createContext();

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter(expense => expense.budgetId === budgetId);
  };

  const addExpense =({ description, amount, budgetId }) => {
    // TODO : useState의 setter함수에 대해 다시 학습해보자
    setExpenses(prevExpenses => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
    })
  };

  const addBudget =({ name, max }) => {
    // TODO : useState의 setter함수에 대해 다시 학습해보자
    setBudgets(prevBudgets => {
      if(prevBudgets.find(budget => budget.name === name)) {
        alert('이미 있는 budget입니다')
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max}];
    })
  };
  const deleteBudget =({ id }) => {
    // TODO : uncategorized로 넣는다.
    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id);
    })
  };
  const deleteExpense =({ id }) => {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id);
    })
  };
  
  return <BudgetsContext.Provider value={{
    budgets, 
    expenses, 
    getBudgetExpenses,
    addExpense,
    addBudget,
    deleteBudget,
    deleteExpense
  }}>
    {children}
  </BudgetsContext.Provider>;
}