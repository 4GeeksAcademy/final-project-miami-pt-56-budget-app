import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import ExpensesTable from '../component/ExpensesTable';
import SideNavBar from '../component/sidenavbar';
import '../../styles/expenses.css'

const Expenses = () => {

    const [showModal, setShowModal] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [splitOption, setSplitOption] = useState('Alone');

    const expenses = [
        { id: 1, description: 'Groceries', amount: '$150', date: '2023-04-10' },
        { id: 2, description: 'Dinner', amount: '$130', date: '2023-04-11' },
        { id: 3, description: 'Gym', amount: '$150', date: '2023-04-10' },
        { id: 4, description: 'Rent', amount: '$2300', date: '2023-04-11' },
    ]

    const handleAddExpense = ()=> {
        setShowModal(true);
    }

    const handleCloseModal = ()=> {
        setShowModal(false)
    }

    return (
        <>
            <Container fluid>
                <Row>
                    {/* Sidebar */}
                    <Col xl={2}>
                        <SideNavBar />
                    </Col>
                    {/* Content */}
                    <Col xl={10}>
                        <Row>
                            <Col xl={6}> <h2 className='text-center mt-5'>Expenses</h2></Col>
                            <Col xl={3}> <button className='expense-btn my-5' onClick={handleAddExpense}>Add Expense</button></Col>
                            <Col xl={3}> <button className='expense-btn my-5'> Sort by Amount {sortOrder === 'asc' ? 'Ascending' : 'Descending'}</button></Col>
                        </Row>
                        <Row>
                            <ExpensesTable expenses={expenses} />
                        </Row>
                    </Col>
                </Row>
            </Container>

             {/* Add Expense Modal */}
             <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Your form for adding expenses goes here */}
                    <Form>
                        {/* Example input field */}
                        <Form.Group controlId="expenseDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" />
                        </Form.Group>
                        <Form.Group controlId="expenseAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" placeholder="Enter amount" />
                        </Form.Group>
                        <Form.Group controlId="splitOption">
                            <Form.Label>Split Option</Form.Label>
                            <Dropdown onSelect={(eventKey) => setSplitOption(eventKey)}>
                                <Dropdown.Toggle variant="primary" id="splitDropdown">
                                    {splitOption}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="Alone">Alone</Dropdown.Item>
                                    <Dropdown.Item eventKey="Split">Split</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>

                        {/* Add more form fields for amount, date, etc. as needed */}

                        <Button variant="primary" type="button" onClick={() => handleSaveExpense(formData)}>
                            Save Expense
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>

    );
}

export default Expenses;