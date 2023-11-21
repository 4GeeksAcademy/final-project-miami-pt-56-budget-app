import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import logo from "../../img/BetterBudget-logo.jpg";
import '../../styles/index.css'

export const AppNavbar = () => {
  return (
    <Navbar
      style={{ backgroundColor: "#F2EEE4", color: "#5065A8" }}
      expand="md"
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            style={{ maxWidth: "120px", maxHeight: "120px" }}
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>

        {/* For Splash page */}
        <Nav className="ml-auto">
          <Nav.Link href="/signin">Login</Nav.Link>
          <Nav.Link href="/signup">Sign up</Nav.Link>
        </Nav>

        {/* User Homepage */}
        {/* <NavDropdown 
        title={
        <span className="text-body my-auto">Welcome Benjamin Ly!</span>
        }
        className="custom-dropdown"
        id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">Account Settings</NavDropdown.Item>
          <NavDropdown.Item href="#action4" style={{ color: 'red' }}>Logout</NavDropdown.Item>
        </NavDropdown> */}
      </Container>
    </Navbar>
  );
};
