import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ExpensesTable from '../component/ExpensesTable';
import SideNavBar from '../component/sidenavbar';
import '../../styles/expenses.css'

const Expenses = () => {

    const [sortOrder, setSortOrder] = useState('asc');

    const expenses = [
        { id: 1, description: 'Groceries', amount: '$150', date: '2023-04-10' },
        { id: 2, description: 'Dinner', amount: '$130', date: '2023-04-11' },
        { id: 3, description: 'Gym', amount: '$150', date: '2023-04-10' },
        { id: 4, description: 'Rent', amount: '$2300', date: '2023-04-11' },
    ]

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
                            <Col xl={3}> <button className='expense-btn my-5'>Add Expense</button></Col>
                            <Col xl={3}> <button className='expense-btn my-5'> Sort by Amount {sortOrder === 'asc' ? 'Ascending' : 'Descending'}</button></Col>
                        </Row>
                        <Row>
                            <ExpensesTable expenses={expenses} />
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>

    );
}

export default Expenses;