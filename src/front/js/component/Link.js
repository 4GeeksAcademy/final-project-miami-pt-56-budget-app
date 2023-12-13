import React, { useContext, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import { Context } from "../store/appContext";
import {Button} from 'react-bootstrap';
import "../../styles/styles.css";

const PlaidLink = () => {
    const { store, actions } = useContext(Context);
    const { open, ready } = usePlaidLink({
        token: store.linkToken,
        onSuccess: (public_token, metadata) => {
            const fetchExchangeToken = async () => {
                const opts = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': `Bearer ${sessionStorage.token}`
                    },
                    body: JSON.stringify({
                        'public_token': public_token})
                }
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/set_access_token`, opts);
                    const data = await resp.json();
                    console.log('Exchange token func ', data);
                    if (resp.status === 200) {
                        console.log('Access Token created!')
                    } else if (resp.status === 401) {
                        alert('You must be logged in');
                    } else {
                        console.error(`Unexpected error: ${data.message}`)
                    }
                } catch (error) {
                    console.error(`There was a problem with the fetch operation ${error}`);
                }
            };
            fetchExchangeToken();
            actions.fetchTransactions()
        }
    });
    useEffect(() => {
        actions.fetchLinkToken();
    }, []);
    return (
        <>
            <button className='expense-btn' onClick={() => open()} disabled={!ready} >
                Connect with Plaid
            </button>
        </>
    );
};
export default PlaidLink;