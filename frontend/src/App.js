import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import LandingPage from './components/landingpage/LandingPage';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route path='/' component={LandingPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
