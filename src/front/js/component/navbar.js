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
              <Link to={"/signin"}>Login</Link>
              <Link to={"/signup"}>Sign up</Link>
            </Nav>
          )}

          {/* User Homepage */}
          {loggedIn && (
            <>
              <Nav className="me-auto">
                <Link to={"/expenses"}>Expenses</Link>
                <Link to={"/piggybankpage"}>Piggy Bank</Link>
                <Link to={"/groups"}>Groups</Link>
                <Link to={"/friends"}>Friends</Link>
              </Nav>
              <NavDropdown
                title={
                  <span className="text-body my-auto">Hello, {store.userName}!</span>
                }
                className="custom-dropdown"
                id="navbarScrollingDropdown">

                <NavDropdown.Item to={"/account"} className="dropdown m-0">Account Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogoutClick} className="logout dropdown m-0">Logout</NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
