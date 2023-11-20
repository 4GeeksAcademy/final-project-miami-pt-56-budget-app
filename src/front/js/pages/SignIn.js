import React, { useContext, useState } from "react";
import { Context } from "../store/appContext"
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

import '../../styles/signin.css'

const SignIn = () => {

  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    actions.handleLogin(email, password);
  }

  return (
    <>
      <h1 className="text-center mt-5">Sign In</h1>
      <Container className="singin-container">
        <Form>
          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <button className="form-button" type="submit" onClick={handleClick}>
            Submit
          </button>
          <div className="links">
            <Link to="/signup">
              <span>Create Account</span >
            </Link>
          </div>
          <div className="links mb-3">
            <Link to="/">
              <span>Home</span>
            </Link>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default SignIn