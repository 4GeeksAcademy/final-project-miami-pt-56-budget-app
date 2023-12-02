import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import '../../styles/expenses.css'
import FriendsTable from '../component/FriendsTable';

const Friends = () => {

    const [showModal, setShowModal] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [splitOption, setSplitOption] = useState('Alone');

    const friends = [
        { id: 1, name: 'Steve', sharedgroup: 'Apartment', date: '2023-04-10' },
        { id: 2, name: 'Eric', sharedgroup: 'Apartment', date: '2023-04-11' },
        { id: 3, name: 'Andrew', sharedgroup: 'Apartment', date: '2023-04-10' }
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
                    {/* Content */}
                    <Col xl={10}>
                        <Row>
                            <Col xl={6}> <h2 className='text-center mt-5'>Expenses</h2></Col>
                            <Col xl={3}> <button className='friends-btn my-5' onClick={handleAddExpense}>Add Expense</button></Col>
                            <Col xl={3}> <button className='friends-btn my-5'> Sort by Amount {sortOrder === 'asc' ? 'Ascending' : 'Descending'}</button></Col>
                        </Row>
                        <Row>
                            <FriendsTable friends={friends} />
                        </Row>
                    </Col>
                </Row>
            </Container>

             {/* Add Expense Modal */}
        </>

    );
}

export default Friends;