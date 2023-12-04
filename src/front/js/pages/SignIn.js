import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext"
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

import '../../styles/signin.css'

const SignIn = () => {

/*  This was used to make the NavBar hidden on the SignIn page,
    however it was decided to show. Props were used as argument to this page.
    useEffect(() => {
    props.setCurrentURL('/signin');
  }, []) */

  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    let results = await actions.handleLogin(email, password);
    if (results){
      navigate("/home")
    }
  }

  return (
    <>
      <h1 className="text-center mt-5">Sign In</h1>
      <Container className="singin-container">
        <div>
          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <button className="form-button" type="button" onClick={handleClick}>
            Submit
          </button>
          <div className="links mb-3">
            <Link to="/signup">
              <span>Create Account</span >
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}

export default SignIn