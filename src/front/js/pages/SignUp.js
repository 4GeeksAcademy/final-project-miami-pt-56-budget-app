import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext"
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

import '../../styles/signin.css'

const SignUp = (props) => {

    useEffect(() => {
        props.setCurrentURL("/signup")
    }, [])
    
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const handleClick = () => {
        actions.handleLogin(firstName, lastName, email, password, verifyPassword);
    }

    return (
        <>
            <h1 className="text-center mt-5">Create Account</h1>
            <Container className="singin-container">
                <Form>
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
                    <button className="form-button" type="submit" onClick={handleClick}>
                        Sign Up
                    </button>
                    <div className="links">
                        Already have an account?
                        <Link to="/signin">
                            <span className="ms-1">Sign in</span >
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

export default SignUp