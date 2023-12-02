import React, { useState, useContext} from "react";
import { Modal, Form, Dropdown, Button } from "react-bootstrap";
import Expenses from "../pages/Expenses";
import { Context } from "../store/appContext";


const ExpensesModal = ({show})=> {

    const { actions } = useContext(Context);
    const [splitOption, setSplitOption] = useState('Alone');

    return (
        <Modal show={show} onHide={actions.hideExpensesModal}>
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
                <Button variant="primary" type="button" onClick={() => handleSaveExpense(formData)}>
                    Save Expense
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
    )
}

export default ExpensesModal;