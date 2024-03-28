import { Account } from './account';
import React, { useEffect, useState } from "react";
import { deleteBankAccount } from "../api/bankAccount";
import { IdentityInformation } from "./identityInformation";

export const MainClientContentV2 = props => {
    const { identityInformation, accounts, setEditModal, setDeleteUser } = props;
    const [deleteAccountId, setDeleteAccountId] = useState(null);
    
    useEffect( () => {
        if(deleteAccountId !== null) {
            deleteBankAccount(deleteAccountId)
            setDeleteAccountId(null);
        }
    }, [deleteAccountId]);
    
    
    return (
        <section id="main-content">
            <h1 className="main">My information</h1>
            {
                identityInformation !== null
                    ? (<IdentityInformation
                        firstName={identityInformation.firstName}
                        lastName={identityInformation.lastName}
                        phoneNumber={identityInformation.phoneNumber}
                        email={identityInformation.email}
                        setEditModal={setEditModal}
                        setDeleteUser={setDeleteUser}/>)
                    : <p></p>
            }
            <div id="main-content">
                {accounts.map((account) => (
                    <Account key={account.id}
                             accountId={account.id}
                             name={account.name}
                             type={account.type}
                             balance={account.balance}
                             setDeleteAccountId={setDeleteAccountId}
                    />
                ))}
            </div>
        </section>
    )
}
