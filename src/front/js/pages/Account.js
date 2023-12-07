import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../styles/account.css"

export const EditAccount = () => {
  const { store, actions } = useContext(Context);

  return (
    <Form className="m-3">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="link" type="submit" className="edit-account-link">
        Save
      </Button>
      <Link/>
    </Form>
  );
};
