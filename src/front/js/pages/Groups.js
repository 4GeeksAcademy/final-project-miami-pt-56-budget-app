import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { Context } from "../store/appContext"
import { Link , useNavigate} from "react-router-dom";
import { Hint } from 'react-autocomplete-hint';
import GroupInfo from "../component/GroupInfo";
import "../../styles/styles.css";

const Groups = () => {
    const navigate=useNavigate();
    const { store, actions } = useContext(Context);
    const [groupName, setGroupName] = useState('');
    const [name, setName] = useState('');
    const [remove, setRemove] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
		actions.handleGetUser()
	}, []);

    const handleAddGroup = ()=> {
        actions.showGroupModal(true);
    };
    const handleCloseModal = ()=> {
        actions.hideGroupModal(false)
        actions.hideEditMemberModal(false)
        actions.hideDeleteGroupModal(false)
        setSelectedGroup(null)
        actions.handleGetUser()
    };
    const handleSaveGroup = async()=>{
       await actions.handleAddGroups(groupName)
       handleCloseModal()
    };
    const handleAddMember = async()=>{
        let newMember = friends.find((member)=> member.label == name)
        await actions.handleAddMembers(newMember.id, selectedGroup)
        setName('')
        handleCloseModal()
    };
    const handleDeleteMember = async()=>{
        let oldMember = friends.find((member)=> member.label == remove)
        await actions.handleDeleteMembers(oldMember.id, selectedGroup)
        setRemove('')
        handleCloseModal()
    };
    const handleDeleteUser = async()=>{
        let oldMember = store.userID
        await actions.handleDeleteMembers(oldMember, selectedGroup)
        handleCloseModal()
    };
    const handleDeleteGroup = async()=>{
        await actions.handleDeleteGroups(selectedGroup)
        handleCloseModal()
    };

    const userFriends = store.userFriends
    const friends = []
    userFriends.map((friend) =>{
        let newObj = {};
        newObj['id'] = friend.id;
        newObj['label'] = friend.first_name + " " + friend.last_name;
        friends.push(newObj)
    })

    return (
        <>
            <Container>
                <Row>
                    <Col xl={6} xs={12}>
                        <h2 className="text-center mt-sm-3">Groups</h2>
                    </Col>
                    <Col xl={3} xs={12} sm={6} className="my-3 mb-sm-3">
                        <Button className='expense-btn' onClick={handleAddGroup}>Create New Group</Button>
                    </Col>
                </Row>
                {store.userGroup && store.userGroup.length > 0 && store.userGroup.map((group, key) =>{
                    return <GroupInfo group={group} setSelectedGroup={setSelectedGroup} key={key}/>
                })}
                {store.userGroup.length == 0 && (
                    <>
                    <div className='border border-2 border-dark rounded px-3 py-2 mt-2'>
                        <h4 className="d-flex justify-content-center">{store.userName}, you have no groups.</h4>
                        <h6 className="d-flex justify-content-center">Would you like to start one?</h6>
                    </div>
                    </>
                )}
            </Container>

            {/* Add group modal */}
            <Modal show={store.showGroupModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="groupName">
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control type="text" placeholder="What's your group called?" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                    </Form.Group>
                    {/* <Form.Group controlId="groupMembers">
                        <Form.Label>Group Members</Form.Label>
                        <Form.Control type="text" placeholder="Who's in your group?" />
                    </Form.Group> */}
                    <Button className="mt-2" variant="primary" type="button" onClick={handleSaveGroup}>
                            Create Group
                    </Button>
                </Modal.Body>
            </Modal>

            {/* Add group member modal */}
            <Modal show={store.showAddMemberModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Group Member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="groupAddMembers" className="row">
                        <Form.Label>Add a Group Member</Form.Label>
                        <Col className="col-8">
                            <Hint options={friends} allowTabFill>
                                <input placeholder="Add a friend to the group" value={name} onChange={e => setName(e.target.value)} className="form-control"></input>
                            </Hint>
                        </Col>
                        <Col className="d-flex">
                            <Button className="flex-fill" variant="primary" type="button" onClick={handleAddMember}>
                                Add Member
                            </Button>
                        </Col>  
                    </Form.Group>
                    <Form.Group controlId="groupDeleteMembers" className="row mt-2">
                        <Form.Label>Remove a Group Member</Form.Label>
                        <Col className="col-8">
                            <Hint options={friends} allowTabFill>
                                <input placeholder="Remove a group member" value={remove} onChange={e => setRemove(e.target.value)} className="form-control"></input>
                            </Hint>
                        </Col>
                        <Col className="d-flex">
                            <Button className="flex-fill" variant="primary" type="button" onClick={handleDeleteMember}>
                                Delete Member
                            </Button>
                        </Col>
                    </Form.Group>
                    <div className="mt-3 d-flex justify-content-center">
                        <Button  variant="primary" type="button" onClick={handleCloseModal}>
                                Done
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Delete group modal */}
            <Modal show={store.showDeleteGroup} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="d-flex justify-content-center">Do you want to leave the group?</h6>
                    <div className="d-flex justify-content-evenly">
                        <Button variant="primary" type="button" onClick={handleDeleteUser}>
                            Leave group
                        </Button>
                    </div>
                    <h6 className="d-flex justify-content-center mt-5">Do you want to delete the group?</h6>
                    <p className="d-flex justify-content-center">This will delete the group for everyone</p>
                    <div className="d-flex justify-content-evenly">
                        <Button variant="primary" type="button" onClick={handleDeleteGroup}>
                            Delete group
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default Groups