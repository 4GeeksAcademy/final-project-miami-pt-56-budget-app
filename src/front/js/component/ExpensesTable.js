import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";
import { Table, Container } from "react-bootstrap";
import DeleteExpenseModal from "./DeleteExpenseModal";
import '../../styles/styles.css'

const ExpensesTable = ({ expenses, setTypeOfModal }) => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.fetchUserExpenses();
	}, [])
	//addition to edit expense with existing expenses modal
	const handleEditExpense = (expense) => {
		setTypeOfModal('Edit Expense');
		actions.showExpensesModal(expense);
	};

	const handleDeleteExpense = (expense) => {
		console.log('clicking delete button');
		actions.showDeleteExpenseModal(expense);
	}

	const renderExpensesTable = () => {
		if (expenses?.length > 0) {
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
							<td>{expense.name}</td>
							<td>${expense.amount}</td>
							<td>{actions.formatDate(expense.date, false)}</td>
							<td>{expense.type}</td>
							<td>
								<FontAwesomeIcon icon={faEdit} className="me-2 icon-lnk" onClick={() => handleEditExpense(expense)} />
								{/* Delete modal not showing when clicking button */}
								<FontAwesomeIcon icon={faTrash} className="icon-lnk" onClick={() => handleDeleteExpense(expense)} />
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
		<>
			<Container>
				{renderExpensesTable()}
			</Container>

			{/* Delete expense modal */}
			<DeleteExpenseModal show={store.showDeleteExpenseModal}></DeleteExpenseModal>
		</>


	);
};

export default ExpensesTable;
