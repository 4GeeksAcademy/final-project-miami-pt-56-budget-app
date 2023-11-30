import React, {useState, useContext} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/BetterBudget-logo.jpg";
import '../../styles/navbar.css'

export const NavBar = () => {
  const { store, actions } = useContext(Context);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginClick = () => {
    if(store.token) {
      setLoggedIn(true);
    }
  }

  const handleLogoutClick = () => {
    actions.handleLogout();
    setLoggedIn(false);
  }

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
        {!loggedIn && <Nav className="ml-auto">
          <Nav.Link href="/signin">Login</Nav.Link>
          <Nav.Link href="/signup">Sign up</Nav.Link>
        </Nav>}

        {/* User Homepage */}
        {loggedIn && <NavDropdown
          title={
            <span className="text-body my-auto">Welcome Benjamin Ly!</span>
          }
          className="custom-dropdown"
          id="navbarScrollingDropdown">
          <NavDropdown.Item href="/account">Account Settings</NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogoutClick} className="logout">Logout</NavDropdown.Item>
        </NavDropdown>}

      </Container>
    </Navbar>
  );
};
