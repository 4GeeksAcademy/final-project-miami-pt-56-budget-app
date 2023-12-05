import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { Context } from '../store/appContext'
import { useNavigate } from "react-router-dom";

const GroupInfo = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleEditMember = () => {
        actions.showEditMemberModal(true)
    };
    const group = props.group
    const members = []
    // for (i in group.members){
    //     members.push(i)
    // }

	return (
        <div className='border border-2 border-dark rounded p-3 mb-2'>
                    <Row>
                        <Col>
                            <h3>{group.name}</h3>
                        </Col>
                        <Col className='d-flex flex-row-reverse align-items-center'>
                            <button className='expense-btn' onClick={handleEditMember}>Edit Group</button>
                        </Col>
                    </Row>
                    <Row>
                        <h6>Group Member 1, Group Member 2, Group Member 3</h6>
                    </Row>
                    <Row>
                        <Col>
                            <h5>Shared Expenses</h5>
                        </Col>
                        <Col className='d-flex flex-row-reverse align-items-center'>
                            <button className='expense-btn'>Add Expense</button>
                        </Col>
                    </Row>
                    <Row>
                        <h6 className="ms-2">Expense 1</h6>
                        <h6 className="ms-2">Expense 2</h6>
                        <h6 className="ms-2">Expense 3</h6>
                    </Row>
                    <Row>
                        <Col>
                            <h5>Balance to User</h5>
                        </Col>
                        <Col>
                            <h5 className='d-flex flex-row-reverse'>$0.00</h5>
                        </Col>
                    </Row>                    
                </div>
    )
};

export default GroupInfo