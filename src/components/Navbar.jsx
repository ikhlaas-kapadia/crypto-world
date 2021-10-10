import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/bitcoin.png';
import React, { useState } from 'react';
import { Button, Container, Nav } from 'react-bootstrap';

import '../App.css';

// const Navbar = () => {
//     return ( 
//       <React.Fragment>
//         <Nav className=" side-nav-container" variant="pills" defaultActiveKey="/home">
//         <div className="logo-container">
//           <a href=""><img src={logo} alt="logo" className="logo" /></a>
//         </div>
//           <Nav.Item >
//             <Nav.Link eventKey="home" href="/home">Home</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link eventKey="cryptos">Cryptos</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link eventKey="tracker">Tracker</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link eventKey="news" >
//               News
//             </Nav.Link>
//           </Nav.Item>
//         </Nav>
//       </React.Fragment>

//     );
// }
const Navbar = () => {
    return ( 
      <div className=" side-nav-container">
       <Nav className="flex-column">
         <Nav.Item>
           <Nav.Link href="/home"> <img className="logo" src={logo} alt="Crypto World Logo" /> </Nav.Link>
        </Nav.Item>
        <Nav.Item>
           <Nav.Link eventKey="home" href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
           <Nav.Link eventKey="crypto" href="/crypto">Cryptos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
           <Nav.Link eventKey="portfolio" href="/portfolio">Portfolio</Nav.Link>
        </Nav.Item>
        <Nav.Item>
           <Nav.Link eventKey="news" href="/news">News</Nav.Link>
         </Nav.Item>
       </Nav>
      </div>

    );
}
 
export default Navbar;