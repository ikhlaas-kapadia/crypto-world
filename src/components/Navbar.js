import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/bitcoin.png';
import React, { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';

import '../App.css';

const Navbar = () => {
    return ( 
        <Nav className="flex-column side-nav-container" variant="pills" defaultActiveKey="/home">
          <Nav.Item>
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

    );
}
 
export default Navbar;