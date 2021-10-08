import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/bitcoin.png';
import React, { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';

import '../App.css';

const Navbar = () => {
    return ( 
      <React.Fragment>
        <Nav className="flex-column side-nav-container" variant="pills" defaultActiveKey="/home">
        <div className="logo-container">
          <a href=""><img src={logo} alt="logo" className="logo" /></a>
        </div>
          <Nav.Item >
            <Nav.Link eventKey="home" href="/home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="cryptos">Cryptos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tracker">Tracker</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="news" >
              News
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </React.Fragment>

    );
}
 
export default Navbar;