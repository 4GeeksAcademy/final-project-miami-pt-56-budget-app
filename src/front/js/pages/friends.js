import React, { useState,useContext } from "react";
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
import { Context } from "../store/appContext";


const Friends = () => {
  const { store, actions } = useContext(Context);
  const [showAddFriendsModal, setAddFriendsModal] = useState(false);
  const [friendEmail, setFriendEmail] = useState('')

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

  const addFriendEmail = async () => {
    let result = await actions.addFriend(friendEmail);
    if (result){
      alert("Friend added sucessfully")
      setAddFriendsModal(false)
    }else{
      alert("Unable to add friend")
    }
  }

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
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
                placeholder="Enter their email address"
              />
            </label>
          </form></Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addFriendEmail}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Friends;
