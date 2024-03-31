import React, { useEffect, useState } from "react";
import { IdentityInformation } from "./identityInformation";
import { delay } from "./utils";
import {AccountShort} from "./accountShort";

export const MainContentV2 = props => {
    const { identityInformation, accounts, setUpdateBankAccounts } = props;
    
    useEffect( () => {
        const updateBankAccountLocal = async () => {
            await delay(10000);
            setUpdateBankAccounts(true);
        };

        updateBankAccountLocal();
    }, []);
    
    
    return (
        <section id="main-content">
            <h1 className="main">My profile</h1>
            {
                identityInformation !== null
                    ? (<IdentityInformation
                        firstName={identityInformation.firstName}
                        lastName={identityInformation.lastName}
                        phoneNumber={identityInformation.phoneNumber}
                        email={identityInformation.email}
                        address={identityInformation.address}
                        setEditModal={null}
                        setDeleteUser={null}/>)
                    : <p></p>
            }
            <div id="main-content">
                {accounts.map((account) => (
                    <AccountShort key={account.id}
                             accountId={account.id}
                             name={account.name}
                             type={account.type} 
                             securityCode={account.securityCode} 
                             owner={account.owner}
                             balance={account.balance}
                    />
                ))}
            </div>
        </section>
    )
}
