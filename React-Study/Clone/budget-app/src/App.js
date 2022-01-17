import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import AddBudgetModal from './Components/AddBudgetModal';
import AddExpenseModal from './Components/AddExpenseModal';
import BudgetCard from './Components/BudgetCard';
import TotalBudgetCard from './Components/TotalBudgetCard';
import UnCategorizedBudgetCard from './Components/UnCategorizedBudgetCard';
import ViewExpensesModal from './Components/ViewExpensesModal';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  const { budgets, getBudgetExpenses } = useBudgets();
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          
          <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant='outline-primary' onClick={() => openAddExpenseModal()}>Add Expense</Button>
        </Stack>
        <div style={{
              display:"grid", 
              gridTemplateColumns:"repeat(auto-fill, minmax(300px, 2fr))", 
              gap: "1rem",
              alignItems: "flex-start"
            }}>
              {budgets.map(({ id, name, max }) => {
                const amount = getBudgetExpenses(id).reduce(
                  (total, expense) => total + expense.amount, 
                  0
                );
                return (<BudgetCard
                  key={id} 
                  name={name} 
                  amount={amount} 
                  max={max} 
                  onAddExpenseClick={() => openAddExpenseModal(id)}
                  onViewExpensesClick={() => setViewExpensesModalBudgetId(id)}
                />
                )
              })}
          <UnCategorizedBudgetCard 
            onAddExpenseClick={() => openAddExpenseModal()}
            onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal 
        show={ showAddBudgetModal } 
        handleClose={() => setShowAddBudgetModal(false)} 
      />
      <AddExpenseModal 
        show={ showAddExpenseModal } 
        defaultBudgetId={ addExpenseModalBudgetId } 
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal 
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </>
  )
}

export default App;
