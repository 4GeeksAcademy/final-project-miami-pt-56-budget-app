import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/BetterBudget-logos_green.jpg";
import '../../styles/navbar.css'

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
        <Navbar.Brand className="navbar-brand">
          <Link to = {loggedIn ? "/home" : "/"}>
            <img
              src={logo}
              className="navbar-brand-img d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* For Splash page */}
          {!loggedIn && (
            <Nav className="ms-auto">
              <Link className="nav-link" to={"/signin"}>Login</Link>
              <Link className="nav-link" to={"/signup"}>Sign up</Link>
            </Nav>
          )}

          {/* User Homepage */}
          {loggedIn && (
            <>
              <Nav className="me-auto">
                <Link className="nav-link" to={"/expenses"}>Expenses</Link>
                <Link className="nav-link" to={"/piggybankpage"}>Piggy Bank</Link>
                <Link className="nav-link" to={"/groups"}>Groups</Link>
                <Link className="nav-link" to={"/friends"}>Friends</Link>
              </Nav>
              <NavDropdown
                title={
                  <span className="text-body my-auto">Hello, {store.userName}!</span>
                }
                className="custom-dropdown"
                id="navbarScrollingDropdown">

                <NavDropdown.Item className="dropdown m-0">
                  <Link className="dropdown-item" to={"/account"}>
                    Account Settings
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogoutClick} className="dropdown m-0">
                  <span className="dropdown-item logout">Logout</span>
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
