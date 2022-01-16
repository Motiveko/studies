import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Stack } from 'react-bootstrap';
import BudgetCard from './Components/BudgetCard';

function App() {
  return (
    <Container className="my-4">
      <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        
        <Button variant='primary'>Add Budget</Button>
        <Button variant='outline-primary'>Add Expense</Button>
      </Stack>
      <div style={{display:"grid", 
            gridTemplateColumns:"repeat(auto-fill, minmax(300px, 2fr))", 
            gap: "1rem",
            alignItems: "flex-start"
          }}>
        <BudgetCard name="용돈" amount={3400} max={5000}></BudgetCard>
      </div>
    </Container>
  )
}

export default App;
