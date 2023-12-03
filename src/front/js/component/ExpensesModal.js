import React, { useState, useContext } from "react";
import { Modal, Form, Dropdown, Button, InputGroup, Container } from "react-bootstrap";
import Expenses from "../pages/Expenses";
import { Context } from "../store/appContext";


const ExpensesModal = ({ show }) => {

    const { actions } = useContext(Context);

    const [splitOption, setSplitOption] = useState('Alone');
    const [selectedSplitOption, setSelectedSplitOptions] = useState('');
    const [splitTo, setSplitTo] = useState('');
    const [splitAmount, setSplitAmount] = useState(0);
    const [splitPercentage, setSplitPercentage] = useState(0);
    const [splitCustomAmount, setSplitCustomAmount] = useState(0);
    const [splitEquallyAmount, setSplitEquallyAmount] = useState(0);
    const [calculatedAmount, setCalculatedAmount] = useState('');


    const handleSplitEqually = () => {
        const splitEqually = parseFloat(splitAmount) / 2;
        setSplitEquallyAmount(splitEqually);
        setSelectedSplitOptions('Equally');
    }

    const handleSaveExpense = () => {

        setSplitTo('');
    }

    const renderSplitOptions = () => {
        switch (splitOption) {
            case 'Alone':
                return (
                    <Container className="mt-3">
                        <Button variant="primary" type="button" onClick={() => handleSaveExpense(formData)}>
                            Submit
                        </Button>
                        <Button variant="primary" type="button" onClick={() => handleSaveExpense(formData)}>
                            Cancel
                        </Button>
                    </Container>
                );
            case 'Split':
                return (
                    <>
                        <Form.Group controlId="splitTo">
                            <Form.Label>{`Split With ${splitTo}`}</Form.Label>
                            <Form.Control type="text" placeholder={`Enter ${splitOption}`} value={splitTo} onChange={(e) => setSplitTo(e.target.value)} />
                        </Form.Group>
                        <Button variant="secondary" onClick={() => handleSplitEqually(splitAmount)}>
                            Equally
                        </Button>
                        <Button variant="secondary" onClick={() => setSelectedSplitOptions('Percentage')}>
                            %
                        </Button>
                        <Button variant="secondary" onClick={() => setSelectedSplitOptions('CustomAmount')}>
                            Custom Amount
                        </Button>
                    </>
                );
            default:
                return null;
        }
    };

    const renderSplitInput = () => {
        if (splitOption === 'Alone') {
            return null;
        }

        switch (selectedSplitOption) {
            case 'Percentage':
                const splitByPercentage = parseFloat(splitPercentage);
                const calculatedAmount = !isNaN(splitByPercentage)
                    ? (splitByPercentage / 100) * parseFloat(splitAmount)
                    : '';

                return (
                    <>
                        <Form.Group controlId="splitPercentage">
                            <Form.Label>Enter %</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter percentage"
                                value={splitPercentage}
                                onChange={(e) => {
                                    setSplitPercentage(e.target.value);
                                    const newCalculatedAmount = !isNaN(splitByPercentage)
                                        ? (splitByPercentage / 100) * parseFloat(splitAmount)
                                        : '';
                                    setCalculatedAmount(newCalculatedAmount);
                                }}
                            />
                        </Form.Group>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Amount Owed</InputGroup.Text>
                            <Form.Control type="text" value={calculatedAmount} readOnly />
                        </InputGroup>
                        <Container className="mt-3">
                            <Button variant="primary" type="button" onClick={() => handleSaveExpense(formData)}>
                                Submit
                            </Button>
                            <Button variant="primary" type="button" onClick={() => handleSaveExpense(formData)}>
                                Cancel
                            </Button>
                        </Container>
                    </>

                );
            case 'Equally':
                return (
                    <>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Amount Owed</InputGroup.Text>
                            {splitEquallyAmount && <p>{splitEquallyAmount}</p>}
                        </InputGroup>
                        <Container className="mt-3">
                            <Button variant="primary" type="button" onClick={() => handleSaveExpense(formData)}>
                                Submit
                            </Button>
                            <Button variant="primary" type="button" onClick={() => handleSaveExpense(formData)}>
                                Cancel
                            </Button>
                        </Container>
                    </>

                );
            case 'CustomAmount':
                return (
                    <>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Split Custom Amount</InputGroup.Text>
                            <Form.Control
                                type="number"
                                placeholder="Enter custom amount"
                                value={splitCustomAmount}
                                onChange={(e) => {
                                    setSplitCustomAmount(e.target.value);
                                    const newCalculatedAmount = splitAmount - parseFloat(splitCustomAmount);
                                    setCalculatedAmount(newCalculatedAmount.toFixed(2));
                                }}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Amount Owed</InputGroup.Text>
                            <Form.Control type="text" value={calculatedAmount} readOnly />
                        </InputGroup>
                        <Container className="mt-3">
                            <Button variant="primary" type="button" onClick={() => handleSaveExpense(formData)}>
                                Submit
                            </Button>
                            <Button variant="primary" type="button" onClick={() => handleSaveExpense(formData)}>
                                Cancel
                            </Button>
                        </Container>
                    </>

                );
            default:
                return null;
        }
    };


    return (
        <Modal show={show} onHide={actions.hideExpensesModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="expenseDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description" />
                    </Form.Group>
                    <Form.Group controlId="expenseAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder="Enter amount" value={splitAmount} onChange={(e) => setSplitAmount(e.target.value)} />
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
                    {renderSplitOptions()}
                    {renderSplitInput()}
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ExpensesModal;