import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import AddBudgetModal from './Components/AddBudgetModal';
import AddExpenseModal from './Components/AddExpenseModal';
import BudgetCard from './Components/BudgetCard';
import UnCategorizedBudgetCard from './Components/UnCategorizedBudgetCard';
import { useBudgets } from './contexts/BudgetsContext';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  function openAddExpenseModal(budgetId) {
    console.log(budgetId)
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
                />
                )
              })}
          <UnCategorizedBudgetCard />
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
    </>
  )
}

export default App;
