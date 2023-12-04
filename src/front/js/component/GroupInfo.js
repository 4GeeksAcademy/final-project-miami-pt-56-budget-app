import React, { useContext, useEffect, useState } from "react";
import { Context } from '../store/appContext'
import { useNavigate } from "react-router-dom";

const GroupInfo = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

	return (
        <div>hi</div>
    )
};

export default GroupInfo