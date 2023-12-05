import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteFriendsModal = () => {
    const { store, actions } = useContext(Context);
  
    const handleCloseModal = () => {
      actions.hideDeleteFriendsModal()
    }
    
    return (
      <>
        <Modal show={store.showDeleteFriendsModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you want to delete this friend?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger">
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

export default DeleteFriendsModal