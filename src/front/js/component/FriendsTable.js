import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";
import { Table, Container } from "react-bootstrap";
import '../../styles/friends.css'

const FriendsTable = ({ friends }) => {
	const { store, actions } = useContext(Context);

	return (
		<Container>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Name</th>
						<th>Shared Group</th>
					</tr>
				</thead>
				<tbody>
					{expenses.map((friends) => (
						<tr key={friends.id}>
							<td>{friends.name}</td>
							<td>{friends.sharedgroup}</td>
							<td> 
								<a href=""><FontAwesomeIcon icon={faEdit} className="me-2 icon-lnk" /></a>
								<a href=""><FontAwesomeIcon icon={faTrash} className="icon-lnk" /></a>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
};

export default FriendsTable;