/* import React, { useEffect, useContext } from "react";
import PlaidLink from "react-plaid-link";
import Context from "../store/appContext";

const Link = () => {
    const { store, actions } = useContext(Context)

    return (
        <div>
            <div className={styles.container}>
                {!error && (
                    <div>
                        <h1>Balance</h1>
                        <h2>{value}</h2>
                    </div>
                )}
                {error && <h3>{error}</h3>}
                {items.allIds.length < 1 && (
                    <div>
                        <h3>Link to your bank to view your account balance.</h3>
                        <PlaidLink
                            publicKey={store.public_key}
                            product="auth"
                            env="sandbox"
                            apiVersion={'v2'}
                            clientName="Spend Tracker"
                            onSuccess={this.onItemLinked.bind(this)}
                        />
                    </div>
                )}
            </div>
        </div>
    );


}
export default Link; */
