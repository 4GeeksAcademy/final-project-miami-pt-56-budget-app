import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";
import { Table, Container } from "react-bootstrap";
import '../../styles/expenses.css'

const ExpensesTable = ({ expenses }) => {
	const { store, actions } = useContext(Context);

	//addition to edit expense with existing expenses modal
	const handleEditExpense = (expense) => {
		actions.showExpensesModal(expense);
	};

	const renderExpensesTable = () => {
		if (expenses.length > 0) {
			return (<Table striped bordered hover>
				<thead>
					<tr>
						<th>Description</th>
						<th>Amount</th>
						<th>Date</th>
						<th>Type</th>
					</tr>
				</thead>
				<tbody>
					{(expenses.map((expense) => (
						<tr key={expense.id}>
							<td>{expense.description}</td>
							<td>${expense.amount}</td>
							<td>{expense.date}</td>
							<td>{expense.type}</td>
							<td>
								<FontAwesomeIcon icon={faEdit} className="me-2 icon-lnk" onClick={() => handleEditExpense(expense)} />
								<a href=""><FontAwesomeIcon icon={faTrash} className="icon-lnk" /></a>
							</td>
						</tr>)
					))}
				</tbody>
			</Table>)
		} else {
			return (<h4 className="my-5 text-center">Add your first expense!</h4>)
		}

	}


	return (
		<Container>
			{renderExpensesTable()}
		</Container>
	);
};

export default ExpensesTable;
