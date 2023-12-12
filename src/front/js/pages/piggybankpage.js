import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { Context } from "../store/appContext"
import { Link , useNavigate} from "react-router-dom";
import { Hint } from 'react-autocomplete-hint';
import PiggyBank from "../component/PiggyBankInfo";
import "../../styles/styles.css";

const Piggybank = ()=> {
  const { store, actions } = useContext(Context);
  const [selectedBank, setSelectedBank] = useState({id: '', name: '', goal: '', saved: '', date: '', notes: ''});
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
    setSelectedBank({id: '', name: '', goal: '', saved: '', date: '', notes: ''});
    setEditing(false);
    actions.handleGetUser();
  };
  const addPiggyBank = () => {
    actions.showAddPiggyBank(true);
  }
  const handleSavePiggyBank = async() => {
    await actions.handleAddPiggyBanks(selectedBank.name, selectedBank.goal, selectedBank.saved, selectedBank.date, selectedBank.notes);
    handleClosePiggyBankModals();
  };
  const handleEditPiggyBank = async() => {
    console.log(selectedBank)
    await actions.handleEditPiggyBanks(selectedBank.name, selectedBank.goal, selectedBank.saved, selectedBank.date, selectedBank.notes, selectedBank.id);
    handleClosePiggyBankModals();
  };
  const handleDeletePiggyBank = async() => {
    await actions.handleDeletePiggyBanks(selectedBank.id);
    handleClosePiggyBankModals();
  };

  return (
    <>
      <Container>
        <Row>
        <Col xl={6} xs={12}>
            <h2 className='text-center mt-sm-3'>Piggy Banks</h2>
          </Col>
          <Col xl={3} xs={12} sm={6} className="my-3 mb-sm-3">
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
        {store.userPiggybanks && store.userPiggybanks.length > 0 && store.userPiggybanks.map((bank, key) =>{
          return <PiggyBank key={key} bank={bank} setSelectedBank={setSelectedBank} setEditing={setEditing}/>
        })}
      </Container>

      {/* Add/Edit piggy bank modal */}
      <Modal show={editing ? store.showEditPiggyBankModal : store.showAddPiggyBankModal} onHide={handleClosePiggyBankModals}>
        <Modal.Header closeButton>
          {editing ? <Modal.Title>Edit your Piggy Bank</Modal.Title> : <Modal.Title>Create a New Piggy Bank</Modal.Title>}
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="bankName">
            <Form.Label>Piggy Bank Name</Form.Label>
            <Form.Control type="text" className="mb-2" placeholder="What are you saving for?" value={selectedBank.name} onChange={(e) => setSelectedBank({...selectedBank, name: e.target.value})} />
          </Form.Group>
          <Form.Group controlId="goalAmount">
            <Form.Label>Savings Goal</Form.Label>
            <div className="input-group mb-2">
              <span className="input-group-text">$</span>
              <input type="number" step='.01' className="form-control" aria-label="Savings Goal" placeholder="0.00" value={selectedBank.goal} onChange={(e) => setSelectedBank({...selectedBank, goal: e.target.value})}></input>
            </div>
          </Form.Group>
          <Form.Group controlId="savedAmount">
            <Form.Label>Amount Saved</Form.Label>
            <div className="input-group mb-2">
              <span className="input-group-text">$</span>
              <input type="number" step='.01' className="form-control" aria-label="Amount Saved" placeholder="0.00" value={selectedBank.saved} onChange={(e) => setSelectedBank({...selectedBank, saved: e.target.value})}></input>
            </div>
          </Form.Group>
          <Form.Group controlId="targetDate">
            <Form.Label>Target Date</Form.Label>
            <Form.Control type="date" className="mb-2" value={selectedBank.date} onChange={(e) => setSelectedBank({...selectedBank, date: e.target.value})} />
          </Form.Group>
          <Form.Group controlId="bankName">
            <Form.Label>Notes</Form.Label>
            <textarea className="form-control mb-2" placeholder="Any notes about your piggy bank? (optional)" value={selectedBank.notes} onChange={(e) => setSelectedBank({...selectedBank, notes: e.target.value})} />
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
          <h6 className="text-center">Are you sure you want to delete this piggy bank?</h6>
          <div className="d-flex justify-content-evenly">
            <Button className="mt-2" variant="primary" type="button" onClick={handleDeletePiggyBank}>
              Delete
            </Button>
            <Button className="mt-2" variant="danger" type="button" onClick={handleClosePiggyBankModals}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Piggybank