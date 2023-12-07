import React from "react";
import Expenses from "../pages/Expenses";

const DeleteExpenseModal = () => {
    const { store, actions } = useContext(Context);

    const handleCloseModal = () => {
        actions.hideExpensesModal()
    }

    return (
        <>
            <Modal show={store.showExpensesModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirm {Expenses.name} delete.</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger">
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteExpenseModal;