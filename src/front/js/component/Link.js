import React, { useContext, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import { Context } from "../store/appContext";

const PlaidLink = () => {
    const { store, actions } = useContext(Context);
    const { open, ready } = usePlaidLink({
        token: store.linkToken,
        onSuccess: async (public_token, metadata) => {
            await actions.fetchExchangeToken(public_token);
        }
    });

    useEffect(()=> {
        actions.fetchLinkToken();
    }, []);

    return (
        <>
            <button onClick={() => open()} disabled={!ready} >
                Connect with Plaid
            </button>
        </>
    );
};

export default PlaidLink;