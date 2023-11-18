import React, { useContext } from "react";
import { Context } from "../store/appContext"
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

const SignIn = () => {

  const { store, actions } = useContext(Context);

  return (
    <>
      <h1 className="text-center mt-5">Log In</h1>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" value={store.email} onChange={(e) => actions.handleInputChange(e)} />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Link to="/SignUp">
            <span>Create Account</span>
          </Link>
        </Form>
        <Button className="mt-3" variant="primary" type="submit">
          Submit
        </Button>
      </Container>
    </>
  );
}

export default SignIn