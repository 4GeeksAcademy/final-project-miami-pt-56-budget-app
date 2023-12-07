import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { Context } from '../store/appContext'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const PiggyBank = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const editPiggyBank = () => {
        actions.showEditPiggyBank(true)
    }
    const deletePiggyBank = () => {
        actions.showDeletePiggyBank(true)
    }

    const bank = props.bank
    console.log(bank)
    return(
        <div className='border border-2 border-dark rounded px-3 py-2 mt-2'>
            <Row>
                <Col className="d-flex justify-content-between">
                    <h3>{bank.name}</h3>
                    <div>
                        <button onClick={()=>{
                            editPiggyBank(props.setSelectedBank(bank.id))
                        }}>
                            <FontAwesomeIcon icon={faEdit} className="me-2 icon-lnk" />
                        </button>
                        <button onClick={()=>{
                            deletePiggyBank(props.setSelectedBank(bank.id))
                        }}>
                            <FontAwesomeIcon icon={faTrash} className="icon-lnk" />
                        </button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    Amount Saved: {bank.saved}
                </Col>
                <Col>
                    Savings Goal: {bank.goal}
                </Col>
                {bank.target_date != null && (
                    <Col>
                        Target Date: {bank.target_date}
                    </Col>
                )}
            </Row>
            {bank.notes != "" && (
                <Row>
                    <Col>
                        Piggy Bank Notes: {bank.notes}
                    </Col>
                </Row>
            )}
        </div>
    )
};

export default PiggyBank