import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/BetterBudget-logos_green.jpg";
import '../../styles/navbar.css'
import { NavLink } from "react-bootstrap";

export const NavBar = () => {
  const { store, actions } = useContext(Context);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [sessionStorage.token]);

  const handleLogoutClick = () => {
    actions.handleLogout();
    setLoggedIn(false);
    navigate('/');
  }

  return (
    <Navbar expand="md">
      <Container>
        <Navbar.Brand href={loggedIn ? "/home" : "/"} className="navbar-brand">
          <img
            src={logo}
            className="navbar-brand-img d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* For Splash page */}
          {!loggedIn && (
            <Nav className="ms-auto">
              <Nav.Link href="/signin">Login</Nav.Link>
              <Nav.Link href="/signup">Sign up</Nav.Link>
            </Nav>
          )}

          {/* User Homepage */}
          {loggedIn && (
            <>
              <Nav className="me-auto">
                <NavLink href="/expenses">Expenses</NavLink>
                <NavLink href="/piggybankpage">Piggy Bank</NavLink>
                <NavLink href="/groups">Groups</NavLink>
                <NavLink href="/friends">Friends</NavLink>
              </Nav>
              <NavDropdown
                title={
                  <span className="text-body my-auto">Hello, {store.userName}!</span>
                }
                className="custom-dropdown"
                id="navbarScrollingDropdown">

                <NavDropdown.Item href="/account" className="dropdown m-0">Account Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogoutClick} className="logout dropdown m-0">Logout</NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
