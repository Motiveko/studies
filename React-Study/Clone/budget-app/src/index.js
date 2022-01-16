import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BudgetsProvider } from './contexts/BudgetsContext';

ReactDOM.render(
  <BudgetsProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BudgetsProvider>,
  document.getElementById('root')
);


