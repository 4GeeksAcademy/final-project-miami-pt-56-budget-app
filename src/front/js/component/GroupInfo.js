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
    const handleDeleteGroup = () => {
        actions.showDeleteGroupModal(true)
    }
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
                    {group.members.map((person,key)=>{
                        return(
                            <span key={key}>{person.first_name + " " +person.last_name + " "}</span>
                        )
                    })}
                </h6>
            </Row>
            <Row className="mb-1">
                <Col>
                    <h5>Shared Expenses</h5>
                </Col>
                <Col className='d-flex flex-row-reverse align-items-center'>
                    <button className='expense-btn'>Add Expense</button>
                </Col>
            </Row>
            <Row>
                
            </Row>
            <Row>
                <Col>
                    <h5>Balance to User</h5>
                </Col>
                <Col>
                    <h5 className='d-flex flex-row-reverse'>$0.00</h5>
                </Col>
            </Row>
            <div className="d-flex justify-content-evenly mb-2">
                <button className='expense-btn' onClick={()=>{
                    handleDeleteGroup(props.setSelectedGroup(group.id))}}
                >Delete Group</button> 
            </div>                    
        </div>
    )
};

export default GroupInfo