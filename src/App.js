
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, fas } from '@fortawesome/free-solid-svg-icons'
import {Container, Row } from 'react-bootstrap';



import Navbar from './components/Navbar.jsx';
import MainContent from './components/MainContent.jsx';

function App() {
  return (
    <div className="App">
          <Navbar/>
          <MainContent/>
    </div>
  );
}


library.add(fab, faCheckSquare, faCoffee, fas)
export default App;