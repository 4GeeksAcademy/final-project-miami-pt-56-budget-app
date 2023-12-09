import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext"
import { Container, Row, Col, Button, Modal, Form, Dropdown } from 'react-bootstrap';
// import "../../styles/account.css"
import '../../styles/signin.css'

export const EditAccount = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
		actions.handleGetUser()
	}, []);

  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async()=>{
    await actions.handleChangePassword(newPassword)
    actions.handleGetUser()
    setNewPassword('')
  }


  return (
    <>
      <h1 className="text-center mt-5">Account Information</h1>
      <Container className="singin-container">
        <div>
          <Form.Group className="mb-3 mt-3" controlId="formFirstName">
            <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder={store.userFullName} disabled/>
          </Form.Group>
          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder={store.userEmail} disabled/>
          </Form.Group>
          <Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
            <Form.Label>Update Password</Form.Label>
            <Form.Control type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
          </Form.Group>
          <button className="form-button mb-3" onClick={()=>handleChangePassword()}>
            Update Password
          </button>
        </div>
      </Container>
    </>
    
  );
};
