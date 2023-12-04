import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";
import { Table, Container } from "react-bootstrap";
import '../../styles/expenses.css'

const ExpensesTable = ({ expenses }) => {
	const { store, actions } = useContext(Context);

	const [expenseToEdit, setExpenseToEdit] = useState(null);

	const handleEditExpense = (expense) => {
        // Logic to handle editing an existing expense
        setExpenseToEdit(expense);
        actions.showExpensesModal;
    };

	return (
		<Container>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Description</th>
						<th>Amount</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{expenses.map((expense) => (
						<tr key={expense.id}>
							<td>{expense.description}</td>
							<td>{expense.amount}</td>
							<td>{expense.date}</td>
							<td> 
								<FontAwesomeIcon icon={faEdit} className="me-2 icon-lnk" onClick={() => handleEditExpense(expense)} />
								<a href=""><FontAwesomeIcon icon={faTrash} className="icon-lnk" /></a>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
};

export default ExpensesTable;
