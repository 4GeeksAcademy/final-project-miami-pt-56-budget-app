import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext"
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link , useNavigate} from "react-router-dom";

import '../../styles/signin.css'

const SignUp = () => {
    const navigate=useNavigate()

/*  This is used to make the NavBar not show on SignUp,
    but it was decided to show. props were being passed as argument to this page.
        useEffect(() => {
        props.setCurrentURL("/signup")
    }, []) */
    
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const handleClick = async () => {
        if (verifyPassword==password) {
       let result = await actions.handleSingUp(firstName, lastName, email, password);
       if (result==true) {
        navigate("/signin")
       }}else{alert("password must match")}
    }

    return (
        <>
            <h1 className="text-center mt-5">Create Account</h1>
            <Container className="singin-container">
                <div>
                    <Form.Group className="mb-3 mt-3" controlId="formFirstName">
                        <Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3" controlId="formLastName">
                        <Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formVerifyPassword">
                        <Form.Control type="password" placeholder="Verify Password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
                    </Form.Group>
                    <button className="form-button" onClick={()=>handleClick()}>
                        Sign Up
                    </button>
                    <div className="links mb-3">
                        Already have an account?
                        <Link to="/signin">
                            <span className="ms-1">Sign in</span >
                        </Link>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default SignUp