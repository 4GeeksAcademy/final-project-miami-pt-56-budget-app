import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { Context } from "../store/appContext"
import { Link , useNavigate} from "react-router-dom";
import { Hint } from 'react-autocomplete-hint';
import PiggyBank from "../component/PiggyBankInfo";

const Piggybank = ()=> {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState(null);
  const [saved, setSaved] = useState(null);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
		actions.handleGetUser()
	}, []);

  // useEffect(()=> {
  //   if(editing == true){
  //     setName(store.userPiggybanks.find((bank)=>bank.id == selectedBank).name)
  //     console.log(name)
  //   }
  // }, [])

  const handleClosePiggyBankModals = () => {
    actions.hideAddPiggyBank(false);
    actions.hideEditPiggyBank(false);
    actions.hideDeletePiggyBank(false);
    setName('');
    setGoal(undefined);
    setSaved(undefined);
    setDate('');
    setNotes('');
    setSelectedBank(null);
    setEditing(false);
    actions.handleGetUser();
  };
  const addPiggyBank = () => {
    actions.showAddPiggyBank(true);
  }
  const handleSavePiggyBank = async() => {
    await actions.handleAddPiggyBanks(name, goal, saved, date, notes);
    handleClosePiggyBankModals();
  };
  const handleEditPiggyBank = async() => {
    console.log(name, goal, saved, date, notes)
    await actions.handleEditPiggyBanks(name, goal, saved, date, notes, selectedBank);
    handleClosePiggyBankModals();
  };
  const handleDeletePiggyBank = async() => {
    await actions.handleDeletePiggyBanks(selectedBank);
    handleClosePiggyBankModals();
  };
  // console.log(editing)
  // console.log(store.userPiggybanks.find((bank)=>bank.id == selectedBank).name)

  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col md={6} xs={12}>
            <h2 className='text-center'>Piggy Banks</h2>
          </Col>
          <Col md={6} xs={12}>
            <Button className='expense-btn' onClick={addPiggyBank}>
              Add Piggy Bank
            </Button>
          </Col>
        </Row>
        {store.userPiggybanks.length == 0 && (
          <>
            <div className='border border-2 border-dark rounded px-3 py-2 mt-2'>
                <h4 className="d-flex justify-content-center">{store.userName}, you have no piggy banks.</h4>
                <h6 className="d-flex justify-content-center">What would you like to start saving for?</h6>
            </div>
          </>
        )}
        {store.userPiggybanks && store.userPiggybanks.length > 0 && store.userPiggybanks.map((bank) =>{
          return <PiggyBank bank={bank} setSelectedBank={setSelectedBank} setEditing={setEditing}/>
        })}
      </Container>

      {/* Add/Edit piggy bank modal */}
      <Modal show={editing ? store.showEditPiggyBankModal : store.showAddPiggyBankModal} onHide={handleClosePiggyBankModals}>
      {/* {useEffect(()=> {
        if(editing == true){
          setName(store.userPiggybanks.find((bank)=>bank.id == selectedBank).name)
          console.log(name)
        }
      },[])} */}
        <Modal.Header closeButton>
          {editing ? <Modal.Title>Edit your Piggy Bank</Modal.Title> : <Modal.Title>Create a New Piggy Bank</Modal.Title>}
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="bankName">
            <Form.Label>Piggy Bank Name</Form.Label>
            <Form.Control type="text" className="mb-2" placeholder="What are you saving for?" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="goalAmount">
            <Form.Label>Savings Goal</Form.Label>
            <div className="input-group mb-2">
              <span className="input-group-text">$</span>
              <input type="number" step='.01' className="form-control" aria-label="Savings Goal" placeholder="0.00" value={goal} onChange={(e) => setGoal(e.target.value)}></input>
            </div>
          </Form.Group>
          <Form.Group controlId="savedAmount">
            <Form.Label>Amount Saved</Form.Label>
            <div className="input-group mb-2">
              <span className="input-group-text">$</span>
              <input type="number" step='.01' className="form-control" aria-label="Amount Saved" placeholder="0.00" value={saved} onChange={(e) => setSaved(e.target.value)}></input>
            </div>
          </Form.Group>
          <Form.Group controlId="targetDate">
            <Form.Label>Target Date</Form.Label>
            <Form.Control type="date" className="mb-2" value={date} onChange={(e) => setDate(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="bankName">
            <Form.Label>Notes</Form.Label>
            <textarea className="form-control mb-2" placeholder="Any notes about your piggy bank? (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Form.Group>
          {editing?
          <Button className="mt-2" variant="primary" type="button" onClick={handleEditPiggyBank}>
            Save Piggy Bank
          </Button>
        : <Button className="mt-2" variant="primary" type="button" onClick={handleSavePiggyBank}>
            Create Piggy Bank
          </Button>}
        </Modal.Body>
      </Modal>

      {/* Delete piggybank modal */}
      <Modal show={store.showDeletePiggyBankModal} onHide={handleClosePiggyBankModals}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Piggy Bank</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="d-flex justify-content-center">Are you sure you want to delete this piggy bank?</h6>
          <Button className="mt-2" variant="primary" type="button" onClick={handleDeletePiggyBank}>
            Delete Piggy Bank
          </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Piggybank