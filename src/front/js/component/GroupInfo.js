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

	return (
        <div className='border border-2 border-dark rounded px-3 py-2 mt-2'>
            <Row>
                <Col>
                    <h3>{group.name}</h3>
                </Col>
                <Col className='d-flex flex-row-reverse align-items-center'>
                    <button className='expense-btn' onClick={()=>{
                        handleEditMember(props.setSelectedGroup(group.id))
                    }}>Edit Group Members</button>
                </Col>
            </Row>
            <Row>
                <h6>
                    {group.members.map((person)=>{
                        return(
                            <span>{person.first_name + " " +person.last_name + " "}</span>
                        )
                    })}
                </h6>
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
                {group.expenses.length > 0 && group.expenses.map((expense) =>{
                    return(
                        <Row>
                            <Col className="ms-2">{expense.name}</Col>
                            <Col className='d-flex flex-row-reverse'>{expense.amount}</Col>
                        </Row>
                    )
                })}
                {group.expenses.length == 0 && (
                    <>
                    <h6 className="d-flex justify-content-center">There are no shared expenses yet. Would you like to add some?</h6>
                    </>
                )}
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