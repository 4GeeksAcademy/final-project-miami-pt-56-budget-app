import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { Context } from "../store/appContext"
import { Link , useNavigate} from "react-router-dom";
import { Hint } from 'react-autocomplete-hint';
import GroupInfo from "../component/GroupInfo";

// notes to self:
//     X: need add group button that leads to create group Modal
//     Group info includes:
//    X     Group name:
//    X     Group members:
//         Balance due to which user:
//    X     list of shared expenses:

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
        setSelectedGroup(null)
    };
    const handleSaveGroup = async()=>{
       let results = await actions.handleAddGroups(groupName)
       actions.hideGroupModal(false)
    };
    const handleAddMember = async()=>{
        let newMember = friends.find((member)=> member.label == name)
        console.log(newMember)
        await actions.handleAddMembers(newMember.id, selectedGroup)
    };
    const handleDeleteMember = async()=>{
        let oldMember = friends.find((member)=> member.label == remove)
        console.log(oldMember)
        await actions.handleDeleteMembers(oldMember.id, selectedGroup)
    }

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
                <Row className="mt-3">
                    <Col className="d-flex align-items-center">
                        <h2>Groups</h2>
                    </Col>
                    <Col className='d-flex flex-row-reverse align-items-center'>
                        <button className='expense-btn' onClick={handleAddGroup}>Create New Group</button>
                    </Col>
                </Row>
                {store.userGroups && store.userGroups.length > 0 && store.userGroups.map((group) =>{
                    return <GroupInfo group={group} setSelectedGroup={setSelectedGroup}/>
                })}
                {store.userGroups.length == 0 && (
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

        </>
    );
}

export default Groups