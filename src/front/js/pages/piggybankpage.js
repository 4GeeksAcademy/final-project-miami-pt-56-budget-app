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
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);

  useEffect(() => {
		actions.handleGetUser()
	}, []);

  const handleClosePiggyBankModals = () => {
    actions.hideAddPiggyBank(false)
    actions.hideEditPiggyBank(false)
    actions.hideDeletePiggyBank(false)
    setSelectedBank(null)
    actions.handleGetUser()
  };
  const addPiggyBank = () => {
    actions.showAddPiggyBank(true)
  }
  const handleSavePiggyBank = async() => {
    await actions.handleAddPiggyBanks(name, goal, saved, date, notes)
    handleClosePiggyBankModals()
  };
  const handleEditPiggyBank = async() => {
    await actions.handleEditPiggyBanks(name, goal, saved, date, notes, selectedBank)
    handleClosePiggyBankModals()
  };
  const handleDeletePiggyBank = async() => {
    await actions.handleDeletePiggyBanks(selectedBank)
    handleClosePiggyBankModals()
  };


  return (
    <div>
        Test
    </div>
  )
}

export default Piggybank