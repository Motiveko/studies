import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import AddBudgetModal from './Components/AddBudgetModal';
import BudgetCard from './Components/BudgetCard';
import { useBudgets } from './contexts/BudgetsContext';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const { budgets, expenses, getBudgetExpenses } = useBudgets();
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          
          <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant='outline-primary'>Add Expense</Button>
        </Stack>
        <div style={{display:"grid", 
              gridTemplateColumns:"repeat(auto-fill, minmax(300px, 2fr))", 
              gap: "1rem",
              alignItems: "flex-start"
            }}>
              {budgets.map(({ id, name, max }) => {
                const amount = getBudgetExpenses(id).reduce(
                  (total, expense) => total + expense, 
                  0
                );
                console.log(amount)
                return (<BudgetCard
                  key={id} 
                  name={name} 
                  amount={amount} 
                  max={max} />)
              })}
          
        </div>
      </Container>
      <AddBudgetModal show={ showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} handleSubmit={() => {}} />
    </>
  )
}

export default App;
