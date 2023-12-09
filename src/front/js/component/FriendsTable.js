import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Container, Table } from "react-bootstrap";
import { Context } from "../store/appContext";
import DeleteFriendsModal from "./DeleteFriendsModal";

const FriendsTable = ({ friends }) => {
  console.log("Friends table");

  const { store, actions } = useContext(Context);
  const [friendEmail, setFriendEmail] = useState("");

  const handleDeleteFriends = (email) => {
    setFriendEmail(email);
    actions.showDeleteFriendsModal();
  };

  return (
    <Container className="friends-container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(friends) && friends.length === 0 ? (
            <tr>
              <td colSpan="3">
                <div>
                  <h2>You have no friends</h2>
                  <h2>Click on add friends to add one</h2>
                </div>
              </td>
            </tr>
          ) : (
            friends?.map((friend) => (
              <tr key={friend.id}>
                <td>{friend.first_name + " " + friend.last_name}</td>
                <td>{friend.email}</td>
                <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="icon-lnk"
                      onClick={() => handleDeleteFriends(friend.email)}
                    />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {store.showDeleteFriendsModal && (
        <DeleteFriendsModal friendEmail={friendEmail} />
      )}
    </Container>
  );
};

export default FriendsTable;
