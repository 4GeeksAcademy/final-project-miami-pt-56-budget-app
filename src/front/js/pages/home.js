import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import UserHome from "../component/UserHome";
import "../../styles/home.css";

export const Home = (props) => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		props.setCurrentURL('');
	}, [])

	return (
		<div className="text-center mt-5">
			<UserHome/>
		</div>
	);
};
