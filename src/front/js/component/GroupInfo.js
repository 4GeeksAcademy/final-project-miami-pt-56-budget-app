import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form, Dropdown, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Context } from '../store/appContext'
import ExpensesModal from '../component/ExpensesModal';
import DeleteExpenseModal from "./DeleteExpenseModal";
import { useNavigate } from "react-router-dom";

const GroupInfo = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [typeOfModal, setTypeOfModal] = useState('');

    const handleEditMember = () => {
        actions.showEditMemberModal(true)
    };
    const handleDeleteGroup = () => {
        actions.showDeleteGroupModal(true)
    }
    const handleAddExpense = () => {
        setTypeOfModal('Add Expense')
        actions.showExpensesModal(true)
    }
    const handleEditExpense = (expense) => {
		setTypeOfModal('Edit Expense');
		actions.showExpensesModal(expense);
        console.log(expense)
	};
	const handleDeleteExpense = (expense) => {
		console.log('clicking delete button');
		actions.showDeleteExpenseModal(expense);
	}
    const group = props.group

	return (
        <>
        <div className='border border-2 border-dark rounded px-3 py-2 mt-2'>
            <Row>
                <Col>
                    <h3>{group.name}</h3>
                </Col>
                <Col className='d-flex flex-row-reverse align-items-center'>
                    <Button className='expense-btn' onClick={()=>{
                        handleEditMember(props.setSelectedGroup(group.id))
                    }}>Edit Group Members</Button>
                </Col>
            </Row>
            <Row>
                <h6>
                    {group.members && group.members.map((person,key)=>{
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
                    {/* <Button className='expense-btn' onClick={handleAddExpense}>
                        Add Expense
                    </Button> */}
                </Col>
            </Row>
            <Row>
                {group.expenses && group.expenses.length == 0 && (
                    <>
                        <h6 className="text-center">There are no shared expenses for this group. Would you like to add one?</h6>
                    </>
                )}
                {group.expenses && group.expenses.length > 0 && group.expenses.map((expense, key)=>{
                    return(
                        <>
                            <Row key={key} className="ms-2 mt-2">
                                <Col className="col-md-3 col-12">
                                Expense: {expense.name}
                                </Col>
                                <Col className="col-md-3 col-12">
                                Amount: ${expense.amount}
                                </Col>
                                <Col className="col-md-4 col-12">
                                Date: {actions.formatDate(expense.date, false)}
                                </Col>
                                <Col className="col-md-2 col-12">
                                    {/* <FontAwesomeIcon icon={faEdit} className="me-2 icon-lnk" onClick={() => handleEditExpense(expense)}/> */}
								    <FontAwesomeIcon icon={faTrash} className="icon-lnk" onClick={() => handleDeleteExpense(expense)}/>
                                </Col>
                            </Row>
                        </>
                    )
                })}
            </Row>
            {/* <Row>
                <Col>
                    <h5>Balance to User</h5>
                </Col>
                <Col>
                    <h5 className='d-flex flex-row-reverse'>$0.00</h5>
                </Col>
            </Row> */}
            <div className="d-flex justify-content-evenly mb-2">
                <Button className='expense-btn' onClick={()=>{
                    handleDeleteGroup(props.setSelectedGroup(group.id))}}
                >Delete Group</Button> 
            </div>                    
        </div>

        {/* Expenses modals */}
        <ExpensesModal typeOfModal={typeOfModal} setTypeOfModal={setTypeOfModal} show={store.showExpensesModal}></ExpensesModal>
        {/* Delete expense modal */}
			<DeleteExpenseModal show={store.showDeleteExpenseModal}></DeleteExpenseModal>
        </>
    )
};

export default GroupInfo