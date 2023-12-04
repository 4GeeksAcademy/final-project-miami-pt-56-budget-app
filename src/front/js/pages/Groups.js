import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { Context } from "../store/appContext"
import { Link , useNavigate} from "react-router-dom";

// notes to self:
//     X: need add group button that leads to create group Modal
//     Group info includes:
//         Group name:
//         Group members:
//         Balance due to which user:
//         list of shared expenses:

const Groups = (props) => {
    const navigate=useNavigate()
    const { store, actions } = useContext(Context)
    const [groupName, setGroupName] = useState('');

    useEffect(() => {
		actions.handleGetUser()
	}, [])

    const handleAddGroup = ()=> {
        actions.showGroupModal(true);
    }
    const handleEditMember = () => {
        actions.showEditMemberModal(true)
    }
    const handleCloseModal = ()=> {
        actions.hideGroupModal(false)
        actions.hideEditMemberModal(false)
    }
    const handleSaveGroup = async()=>{
       let results = await actions.handleAddGroups(groupName)
    }
    const handleAddMember = async()=>{
        let results = await actions.handleAddMembers()
    }

    // const groups = store.userGroups;

    return (
        <>
        {console.log(store.userGroups[0])}
            <Container>
                <Row className="mt-3">
                    <Col className="d-flex align-items-center">
                        <h2>Groups</h2>
                    </Col>
                    <Col className='d-flex flex-row-reverse align-items-center'>
                        <button className='expense-btn' onClick={handleAddGroup}>Create New Group</button>
                    </Col>
                </Row>
                <div className='border border-2 border-dark rounded p-3'>
                    <Row>
                        <Col>
                            <h3>Group</h3>
                        </Col>
                        <Col className='d-flex flex-row-reverse align-items-center'>
                            <button className='expense-btn' onClick={handleEditMember}>Edit Group</button>
                        </Col>
                    </Row>
                    <Row>
                        <h6>Group Member 1, Group Member 2, Group Member 3</h6>
                    </Row>
                    <Row>
                        <Col>
                            <h5>Shared Expenses</h5>
                        </Col>
                        <Col className='d-flex flex-row-reverse align-items-center'>
                            <button className='expense-btn'>Add Expense</button>
                        </Col>
                    </Row>
                    <Row>
                        <h6 className="ms-2">Expense 1</h6>
                        <h6 className="ms-2">Expense 2</h6>
                        <h6 className="ms-2">Expense 3</h6>
                    </Row>
                    <Row>
                        <Col>
                            <h5>Balance to User</h5>
                        </Col>
                        <Col>
                            <h5 className='d-flex flex-row-reverse'>$0.00</h5>
                        </Col>
                    </Row>                    
                </div>
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
                    <Form.Group controlId="groupMembers">
                        <Form.Label>Group Members</Form.Label>
                        <Form.Control type="text" placeholder="Who's in your group?" />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={handleSaveGroup}>
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
                        <Form.Label>Group Members</Form.Label>
                        <Col>
                            <Form.Control type="text" placeholder="Who do you want to add?" />
                        </Col>
                        <Col>
                            <Button variant="primary" type="button" onClick={handleAddMember}>
                                Add Member
                            </Button>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="groupDeleteMembers" className="row">
                        <Col>
                            <Form.Control type="text" placeholder="Who do you want to remove?" />
                        </Col>
                        <Col>
                            <Button variant="primary" type="button" onClick={handleAddMember}>
                                Delete Member
                            </Button>
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={handleCloseModal}>
                            Done
                    </Button>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default Groups