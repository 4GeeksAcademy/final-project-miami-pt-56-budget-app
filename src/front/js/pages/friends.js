import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";
import "../../styles/styles.css";
import FriendsTable from "../component/FriendsTable";
import { Context } from "../store/appContext";

const Friends = () => {
  // useEffect(() => {
  //   actions.fetchFriends();
  // }, []);

  const { store, actions } = useContext(Context);
  const [showAddFriendsModal, setAddFriendsModal] = useState(false);
  const [friendEmail, setFriendEmail] = useState("");

  const userEmail = store.userEmail
  // const friends = store.userFriends;
  const [friends, setFriends] = useState([])
  useEffect(() => {
    setFriends(store.userFriends)
  }, [store.userFriends])
  console.log(friends)

  const handleAddFriends = () => {
    setAddFriendsModal(true);
  };

  const handleCloseAddModal = () => {
    setAddFriendsModal(false);
  };

  const addFriendEmail = async () => {
    if (userEmail === friendEmail) {
      alert("You cannot add your own email address as a friend.");
      return;
    }
    let result = await actions.addFriends(friendEmail);
    if (result) {
      // alert("Friend added successfully");
      setAddFriendsModal(false);
    }
  };


  return (
    <>
      <Container >
        <Row>
          <Col xl={6} xs={12}>
            <h2 className="text-center mt-sm-3">Friends</h2>
          </Col>
          <Col xl={3} xs={12} sm={6} className="my-3 mb-sm-3">
            <Button className='expense-btn' onClick={handleAddFriends}>
              Add Friends
            </Button>
          </Col>
        </Row>
        <Row>
          <FriendsTable friends={friends} />
        </Row>
      </Container>

      {/* Add Friends Modal */}
      <Modal show={showAddFriendsModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add friend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>
              <input
                type="text"
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
                placeholder="Enter their email address"
              />
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => addFriendEmail()}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Friends;