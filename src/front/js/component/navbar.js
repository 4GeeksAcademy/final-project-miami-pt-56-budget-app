import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import logo from "../../img/BetterBudget-logo.jpg";
import '../../styles/navbar.css'

export const NavBar = () => {
  return (
    <Navbar expand="md">
      <Container>
        <Navbar.Brand href="/" className="navbar-brand">
          <img
            src={logo}
            className="navbar-brand-img d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>

        {/* For Splash page */}
        {/* <Nav className="ml-auto">
          <Nav.Link href="/signin">Login</Nav.Link>
          <Nav.Link href="/signup">Sign up</Nav.Link>
        </Nav> */}

        {/* User Homepage */}
        <NavDropdown 
        title={
        <span className="text-body my-auto">Welcome Benjamin Ly!</span>
        }
        className="custom-dropdown"
        id="navbarScrollingDropdown">
          <NavDropdown.Item href="/account">Account Settings</NavDropdown.Item>
          <NavDropdown.Item href="#action4" style={{ color: 'red' }}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};
