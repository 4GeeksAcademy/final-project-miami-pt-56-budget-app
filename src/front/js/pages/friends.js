import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";
import "../../styles/friends.css";
import FriendsTable from "../component/FriendsTable";

const Friends = () => {
  const [showAddFriendsModal, setAddFriendsModal] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');

  const friends = [
    { id: 1, name: "Steve", sharedgroup: "Apartment" },
    { id: 2, name: "Eric", sharedgroup: "Apartment" },
    { id: 3, name: "Andrew", sharedgroup: "Apartment" },
  ];

  const handleAddFriends = () => {
    setAddFriendsModal(true);
  };

  const handleCloseAddModal = () => {
    setAddFriendsModal(false);
  };

  return (
    <>
      <Container fluid>
        <Row>
          {/* Content */}
          <Col xl={10}>
            <Row>
              <Col xl={6}>
                <h2 className="text-center mt-5">Friends</h2>
              </Col>
              <Col xl={3}>
                <button className="friends-btn my-5" onClick={handleAddFriends}>
                  Add Friends
                </button>
              </Col>
            </Row>
            <Row>
              <FriendsTable friends={friends} />
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Add Friends Modal */}
      <Modal show={showAddFriendsModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add friend</Modal.Title>
        </Modal.Header>
        <Modal.Body><form>
            <label>
              <input
                type="text"
                value={newFriendName}
                onChange={() => setNewFriendName(e.target.value)}
                placeholder="Enter their email address"
              />
            </label>
          </form></Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseAddModal}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Friends;
