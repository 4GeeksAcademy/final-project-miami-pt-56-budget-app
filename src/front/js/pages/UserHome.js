import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const UserHome = (props) => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		props.setCurrentURL('');
	}, [])

	return (
		<div className="text-center mt-5">	
		<div>
			<h3>Expenses</h3>
		</div>
			<h3>Piggy Banks</h3>
			<div></div>
			<h3>Groups</h3>
			<div></div>
		</div>
	);
};
