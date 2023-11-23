import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../styles/account.css"

export const EditAccount = () => {

const [password, setPassword] = useState('');
const [verifyPassword, setVerifyPassword] = useState('');

  return (
    <Form className="m-3">
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Verify Password" />
      </Form.Group>
      <Button variant="button" type="submit" className="edit-account-button">
        Save
      </Button>
    </Form>
  );
};
