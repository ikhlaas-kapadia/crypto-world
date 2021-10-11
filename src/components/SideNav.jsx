
import logo from '../assets/bitcoin.png';
import React, { useState } from 'react';
import { Button, Container, Nav, Navbar, Image } from 'react-bootstrap';


import '../App.css';
class SideNav extends React.Component {
    constructor(props) {
    super(props);
    this.state = {viewSideBar: false};

    this.handleBurger = this.handleBurger.bind(this);
    this.handleNavClose = this.handleNavClose.bind(this);
  }
  handleBurger = () => {
     this.setState(prevState => ({
      viewSideBar: !prevState.viewSideBar
    }), ()=>{console.log(this.state)});
    console.log('burger clicked');
  };

    handleNavClose = () => {
     this.setState(prevState => ({
      viewSideBar: !prevState.viewSideBar
    }), ()=>{console.log(this.state)});
    console.log('x clicked');
  };
  render() {
    const viewSideBar = this.state.viewSideBar ? "side-nav-container" : "side-nav-container hide-sidenav";
    const viewBurger = this.state.viewSideBar ? "nav-burger hide-burger" : "nav-burger";
    
   
     return ( 
      <React.Fragment>
        <BurgerBtn handleBurger={this.handleBurger} viewBurger={viewBurger}/>
        <div className={viewSideBar}>
          <CloseNavBtn handleNavClose={this.handleNavClose}/>
          <Navbar className="flex-column w-100">
            <Image src={logo} className="logo"/>
            <Container fluid className="flex-column justify-content-center">
              <Nav className="me-auto flex-column w-75 justify-content-center" > 
                <Nav.Link href="#home" className="d-block"><i className='bx bxs-home nav-icon'></i>Home</Nav.Link>
                <Nav.Link href="#link"><i className='bx bx-bitcoin nav-icon'></i>Crypto</Nav.Link>
                <Nav.Link href="#link"><i className='bx bxs-wallet nav-icon'></i>Portfolio</Nav.Link>
                <Nav.Link href="#link"><i className='bx bxs-news nav-icon'></i>News</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </div>

      </React.Fragment>
    );
  }
}


const CloseNavBtn = (props) => {

    return (
    
      <div className="text-right close-btn-container" onClick={props.handleNavClose}>
        <i className='bx bx-x' ></i>
      </div>
    );
};

const BurgerBtn = (props) => {
  const viewBurger= props.viewBurger;
    return(
      <div className={viewBurger} onClick={props.handleBurger}>
        <div></div>
      </div>
    );

}

 
export default SideNav;