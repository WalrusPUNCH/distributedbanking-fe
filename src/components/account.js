import React, { useState } from 'react';
import { AccountActionButtons } from "./accountActionButtons";
import { formatNumber } from "./utils";

export const Account = (props) => {
    const { accountId, name, type, balance, securityCode, setDeleteAccountId } = props;
    
    return (
        <div className="account">
            <div className="details">
                <AccountName name={name} />
                <AccountNumber accountId={accountId} />
                <AccountType type={type} />
                <AccountSecurityCode securityCode={securityCode} />
                <AccountActionButtons
                    accountId={accountId}
                    name={name}
                    setDeleteAccountId={setDeleteAccountId} />
            </div>
            <AccountBalance balance={formatNumber(balance)} />
        </div>
    )
}

export const AccountName = (props) => {
    return (
        <h1>{props.name}</h1>
    )
}


export const AccountType = (props) => {
    return (
        <h3>{props.type}</h3>
    )
}


export const AccountNumber = (props) => {
    return (
        <div>{props.accountId}</div>
    )
}


export const AccountBalance = (props) => {
    const balance = props.balance;
    return (
        <div className="balance">{balance}</div>
    )
}

export const AccountSecurityCode = (props) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div onClick={toggleVisibility} style={{ cursor: 'pointer' }}>
            { isVisible 
                ? (<div>{props.securityCode}</div>) 
                : (
                    <div style={{color: 'transparent', textShadow: '0 0 3px rgba(0, 0, 0, 0.8)'}}>
                    Click to see security code
                    </div>
                )
            }
        </div>
    );
}