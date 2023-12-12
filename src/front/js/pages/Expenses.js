import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../store/appContext";
import { Container, Row, Col, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import ExpensesTable from '../component/ExpensesTable';
// import SideNavBar from '../component/sidenavbar';
import ExpensesModal from '../component/ExpensesModal';
import '../../styles/styles.css'

const Expenses = () => {
    const { store, actions } = useContext(Context);
    const [typeOfModal, setTypeOfModal] = useState('');

    useEffect(()=> {
        actions.fetchUserExpenses();
        actions.fetchUserRelationships();
    }, [])


    const handleAddExpense = () => {
        setTypeOfModal('Add Expense')
        actions.showExpensesModal(true);
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
                        <Button className='my-3 sort-btn text-break' onClick={actions.handleSortByAmount}>
                            Sort by Amount: <br/> {store.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <ExpensesTable setTypeOfModal={setTypeOfModal} expenses={store.userExpenses} />
                    </Col>
                </Row>
                {/* </Col> */}
                {/* </Row> */}
            </Container>

                {/* Expenses modals */}
                <ExpensesModal typeOfModal={typeOfModal} setTypeOfModal={setTypeOfModal} show={store.showExpensesModal}></ExpensesModal>
                    
        </>

    );
}

export default Expenses;