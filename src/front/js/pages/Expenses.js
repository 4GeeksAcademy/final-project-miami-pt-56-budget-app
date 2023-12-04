import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import { Container, Row, Col, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import ExpensesTable from '../component/ExpensesTable';
import SideNavBar from '../component/sidenavbar';
import ExpensesModal from '../component/ExpensesModal';
import '../../styles/expenses.css'

const Expenses = () => {
    const { store, actions } = useContext(Context);
    // const [showModal, setShowModal] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [expenses, setExpenses] = useState([
        { id: 1, description: 'Groceries', amount: '$100', date: '2023-04-10' },
        { id: 2, description: 'Dinner', amount: '$130', date: '2023-04-11' },
        { id: 3, description: 'Gym', amount: '$250', date: '2023-04-10' },
        { id: 4, description: 'Lunch', amount: '$25', date: '2023-04-10' },
        { id: 5, description: 'Rent', amount: '$2300', date: '2023-04-11' },
    ])

    const handleAddExpense = () => {
        actions.showExpensesModal(true);
    }


    const handleSortByAmount = () => {
        const sortedExpenses = [...expenses].sort((a, b) => {
            const amountA = parseFloat(a.amount.slice(1));
            const amountB = parseFloat(b.amount.slice(1));
            return sortOrder === 'asc' ? amountA - amountB : amountB - amountA;
        });

        setExpenses(sortedExpenses);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }


    return (
        <>
            <Container>
                {/* <Row> */}
                {/* Sidebar */}
                {/*  <Col xl={2}>
                        <SideNavBar />
                    </Col> */}
                {/* Content */}
                {/* <Col xl={10}> */}
                <Row>
                    <Col xl={6} xs={12}>
                        <h2 className='text-center mt-sm-3'>Expenses</h2>
                    </Col>
                    <Col xl={3} xs={12} sm={6} className="my-3 mb-sm-3">
                        <Button className='expense-btn' onClick={handleAddExpense}>
                            Add Expense
                        </Button>
                    </Col>
                    <Col xl={3} xs={12} sm={6}>
                        <Button className='my-3 sort-btn text-break' onClick={handleSortByAmount}>
                            Sort by Amount: <br/> {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <ExpensesTable expenses={expenses} />
                    </Col>
                </Row>
                {/* </Col> */}
                {/* </Row> */}
            </Container>

                {/* Expenses modal */}
                <ExpensesModal show={store.showExpensesModal}></ExpensesModal>
                    
        </>

    );
}

export default Expenses;