import React from 'react';
import GlobalStyle from './globalStyles';
import Home from './pages/Home';
import SignUp from './pages/SignUpPage';
import Pricing from './pages/PricingPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
function App() {
  return (
    <Router>
      <GlobalStyle></GlobalStyle>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/pricing" exact component={Pricing} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
