import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Context } from "../store/appContext";

const DeleteFriendsModal = ({friendEmail}) => {
    const { store, actions } = useContext(Context);
  
    const handleCloseModal = () => {
      actions.hideDeleteFriendsModal()
    }
    const handleDeleteFriends = () =>{
      actions.deleteFriends(friendEmail)
      handleCloseModal()
    }
    return (
      <>
        <Modal show={store.showDeleteFriendsModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you want to delete this friend?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger"
            onClick={handleDeleteFriends}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

export default DeleteFriendsModal