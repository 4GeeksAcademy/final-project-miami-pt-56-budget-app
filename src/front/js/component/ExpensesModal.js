import React, { useState, useContext, useEffect } from "react";
import { Modal, Form, Dropdown, Button, InputGroup, Container } from "react-bootstrap";
import { Hint } from "react-autocomplete-hint";
import { Context } from "../store/appContext";


const ExpensesModal = ({ show }) => {

    const { store, actions } = useContext(Context);

    const [splitOption, setSplitOption] = useState('Alone');
    const [selectedSplitOption, setSelectedSplitOptions] = useState('');
    const [splitWith, setSplitWith] = useState('');
    const [splitAmount, setSplitAmount] = useState(0);
    const [splitPercentage, setSplitPercentage] = useState(0);
    const [splitCustomAmount, setSplitCustomAmount] = useState(0);
    //added to be able to edit expense
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseDate, setExpenseDate] = useState('');


    useEffect(() => {
        if (store.expenseToUpdate && store.expenseToUpdate.type === 'Split') {
            actions.fetchUserRelationships();

            setSplitAmount(store.expenseToUpdate.amount);
            setExpenseDescription(store.expenseToUpdate.name);
            setExpenseDate(actions.formatDate(store.expenseToUpdate.date, true));
            setSplitOption(store.expenseToUpdate.type);
            if (store.expenseToUpdate.friend) {
                console.log('use effect modal', store.expenseToUpdate, store.expenseToUpdate.friend)
                setSplitWith(`${store.expenseToUpdate.friend.first_name} ${store.expenseToUpdate.friend.last_name}`);
            } else {
                setSplitWith(store.expenseToUpdate.group.name);
            }
        } else if (store.expenseToUpdate && store.expenseToUpdate.type === 'Alone') {
            setSplitAmount(store.expenseToUpdate.amount);
            setExpenseDescription(store.expenseToUpdate.name);
            setExpenseDate(actions.formatDate(store.expenseToUpdate.date, true));
            setSplitOption(store.expenseToUpdate.type);
        } else {
            setSplitAmount(0);
            setExpenseDescription('');
            setExpenseDate('');
            setSplitOption('Alone');
        }
        

    }, [store.expenseToUpdate]);


    const handleSaveExpense = () => {
        console.log('handle save expense', store.expenseToUpdate);

        if (splitOption === 'Split' && store.expenseToUpdate.length > 0) {
            // Update existing expense
            actions.handleUpdateExpenses(store.expenseToUpdate.id, expenseDescription, splitAmount, expenseDate, splitOption, splitWith);
        } else if (splitOption === 'Split') {
            // Add new expense
            actions.handleAddExpense(expenseDescription, splitAmount, expenseDate, splitOption, splitWith);
        } else if (splitOption === 'Alone' && store.expenseToUpdate.length > 0) {
            //Update existing expense Alone
            actions.handleUpdateExpenses(store.expenseToUpdate.id, expenseDescription, splitAmount, expenseDate, splitOption, splitWith);
        } else {
            // Add new expense (for 'Alone' case)
            actions.handleAddExpense(expenseDescription, splitAmount, expenseDate, splitOption);
        }
    
        setSplitWith('');
        setSplitAmount(0);
        setExpenseDate('');
        setSplitPercentage(0);
        setSplitCustomAmount(0);
    
        actions.hideExpensesModal();
    };

    const renderSplitOptions = () => {
        switch (splitOption) {
            case 'Alone':
                return (
                    <Container className="mt-3 p-0 d-flex justify-content-center">
                        <Button className="me-2" variant="primary" type="button" onClick={() => handleSaveExpense()}>
                            Submit
                        </Button>
                        <Button variant="primary" type="button" onClick={actions.hideExpensesModal}>
                            Cancel
                        </Button>
                    </Container>
                );
            case 'Split':
                return (
                    <>
                        <Form.Group controlId="splitWith">
                            <Form.Label>{`Split With ${splitWith}`}</Form.Label>
                            <Form.Control type="text" placeholder={`Enter Group or Friend name`} value={splitWith} onChange={(e) => setSplitWith(e.target.value)} />
                            {/* <Hint options={renderFilteredOptions()} allowTabFill>
                                <input
                                    value={splitWith}
                                    onChange={e => setSplitWith(e.target.value)}
                                    placeholder="Enter Group or Friend name"
                                />
                            </Hint> */}
                        </Form.Group>
                        <Container className=" my-3 d-flex justify-content-center">
                            <Button className="m-1" variant="secondary" onClick={() => setSelectedSplitOptions('Equally')}>
                                Equally
                            </Button>
                            <Button className="m-1" variant="secondary" onClick={() => setSelectedSplitOptions('Percentage')}>
                                %
                            </Button>
                            <Button className="m-1" variant="secondary" onClick={() => setSelectedSplitOptions('CustomAmount')}>
                                Custom Amount
                            </Button>
                        </Container>
                    </>
                );
            default:
                return null;
        }
    };

    // const renderFilteredOptions = () => {

    //     const allOptions = [...store.userGroups, ...store.userfriends].map(option => option.name)
    //     console.log(allOptions)
    //     return allOptions.map(option => ({
    //         label: option
    //     }))
    // };


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
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Enter %</InputGroup.Text>
                            <Form.Control
                                type="number"
                                placeholder="Enter percentage"
                                value={splitPercentage}
                                onChange={(e) => {
                                    setSplitPercentage(e.target.value);
                                }}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Amount Owed</InputGroup.Text>
                            <Form.Control type="number" value={calculatedAmount === '' ? '' : calculatedAmount.toFixed(2)} readOnly />
                        </InputGroup>
                        <Container className="mt-3 d-flex justify-content-center">
                            <Button className="me-2" variant="primary" type="button" onClick={() => handleSaveExpense()}>
                                Submit
                            </Button>
                            <Button variant="primary" type="button" onClick={actions.hideExpensesModal}>
                                Cancel
                            </Button>
                        </Container>
                    </>
                );
            case 'Equally':
                const splitEqually = parseFloat(splitAmount) / 2;
                return (
                    <>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Amount Owed</InputGroup.Text>
                            <Form.Control type="number" value={splitEqually.toFixed(2)} readOnly />
                        </InputGroup>
                        <Container className="mt-3 d-flex justify-content-center">
                            <Button className="me-2" variant="primary" type="button" onClick={() => handleSaveExpense()}>
                                Submit
                            </Button>
                            <Button variant="primary" type="button" onClick={actions.hideExpensesModal}>
                                Cancel
                            </Button>
                        </Container>
                    </>
                );
            case 'CustomAmount':
                const newCalculatedAmount = splitAmount - parseFloat(splitCustomAmount);
                return (
                    <>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Enter Custom Amount</InputGroup.Text>
                            <Form.Control
                                type="number"
                                placeholder={
                                    splitCustomAmount === '' || splitCustomAmount > splitAmount
                                        ? 'Enter a valid amount'
                                        : splitCustomAmount}
                                value={splitCustomAmount}
                                onChange={(e) => {
                                    setSplitCustomAmount(e.target.value);
                                }}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Amount Owed</InputGroup.Text>
                            <Form.Control type="number" value={newCalculatedAmount === '' ? '' : newCalculatedAmount.toFixed(2)} readOnly />
                        </InputGroup>
                        <Container className="mt-3 d-flex justify-content-center">
                            <Button className="me-2" variant="primary" type="button" onClick={() => handleSaveExpense()}>
                                Submit
                            </Button>
                            <Button variant="primary" type="button" onClick={actions.hideExpensesModal}>
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
        <Modal className="modals align-center" show={show} onHide={actions.hideExpensesModal}>
            <Modal.Header closeButton>
                <Modal.Title>{store.expenseToUpdate ? 'Edit Expense' : 'Add Expense'}</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form>
                    <Form.Group controlId="expenseDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description" value={expenseDescription} onChange={(e) => setExpenseDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="expenseAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder="Enter amount" value={splitAmount} onChange={(e) => setSplitAmount(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="expenseDescription">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" placeholder="Enter Date" value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mt-3 d-flex justify-content-center" controlId="splitOption">
                        <Form.Label className="me-3">Type</Form.Label>
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