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
                        const accessToken = data.access_token
                        fetchTransactions(accessToken)
                    } else if (resp.status === 401) {
                        alert('You must be logged in');
                    } else {
                        console.error(`Unexpected error: ${data.message}`)
                    }
                } catch (error) {
                    console.error(`There was a problem with the fetch operation ${error}`);
                }
            };
            const fetchTransactions = async (accessToken) => {
                const transactionsOpts = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.token}`
                    },
                    body: JSON.stringify({
                        access_token: accessToken
                    })
                };

                try {
                    const transactionsResp = await fetch(`${process.env.BACKEND_URL}/api/transactions`, transactionsOpts);
                    const transactionsData = await transactionsResp.json();

                    console.log("transactions", transactionsData);

                    if (transactionsResp.ok) {
                        console.log('Transactions added!');
                    } else if (transactionsResp.status === 401) {
                        alert('You must be logged in');
                    } else {
                        console.error(`Unexpected error: ${transactionsData.message}`);
                    }
                } catch (error) {
                    console.error(`There was a problem with the fetch operation: ${error}`);
                }
            };
            fetchExchangeToken();
        }
    });


    useEffect(() => {
        actions.fetchLinkToken();
    }, []);

    return (
        <>
            <Button className='expense-btn' onClick={() => open()} disabled={!ready} >
                Connect with Plaid
            </Button>
        </>
    );
};

export default PlaidLink;