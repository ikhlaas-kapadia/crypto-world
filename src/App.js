
import './App.css';

import SideNav from './components/SideNav';
import CryptoPage from './components/CryptoPage';
import {HomePage}  from './components/HomePage';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (

      <div className="App">
        <SideNav/>
        <Router>
          <Switch>
            <Route path="/crypto">
              <CryptoPage />
            </Route>
            <Route path="/">
              <HomePage/>
            </Route>
          </Switch>
        </Router>
      </div>
  
  );
}

export default App;