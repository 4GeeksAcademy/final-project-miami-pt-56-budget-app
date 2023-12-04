import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import UserHome from "../component/UserHome";
import "../../styles/home.css";
import SideNavBar from "../component/sidenavbar";

export const Home = (props) => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			{/* <SideNavBar/> */}
			<UserHome/>
		</div>
	);
};
