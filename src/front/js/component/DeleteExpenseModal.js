import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import Expenses from "../pages/Expenses";

const DeleteExpenseModal = ({ show }) => {
    const { store, actions } = useContext(Context);

    const handleDelete = () => {
        actions.handleDeleteExpense(store.expenseToDelete.id);
        actions.hideExpensesModal();
    }

    return (
        <>
            <Modal show={show} onHide={actions.hideExpensesModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirm Removal of {store.expenseToDelete.name} expense.</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteExpenseModal;