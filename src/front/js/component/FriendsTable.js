import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Container, Table } from "react-bootstrap";
import { Context } from "../store/appContext";
import DeleteFriendsModal from "./DeleteFriendsModal";

const FriendsTable = ({ friends }) => {
  console.log("Friends table")

  const { store, actions } = useContext(Context);
  const [friendEmail, setFriendEmail] = useState('')

  const handleDeleteFriends = (email) => {
    setFriendEmail(email)
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
          {friends.length == 0?(<div>No Friends</div>):friends?.map((friend) => (
            <tr key={friend.id}>
              <td>{friend.first_name}</td>
              <td>{friend.email}</td>
              <td>
                <button>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="icon-lnk"
                    onClick={() => handleDeleteFriends(friend.email)}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {store.showDeleteFriendsModal && <DeleteFriendsModal friendEmail={friendEmail}/>}
    </Container>
  );
};

export default FriendsTable;