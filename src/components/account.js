import React from "react";
import { AccountActionButtons } from "./accountActionButtons";
import { formatNumber } from "./utils";

export const Account = (props) => {
    const { accountId, name, type, balance, setDeleteAccountId } = props;
    
    return (
        <div className="account">
            <div className="details">
                <AccountHolder name={name} />
                <AccountType type={type} />
                <AccountNumber accountId={accountId} />
                <AccountActionButtons
                    accountId={accountId}
                    name={name}
                    setDeleteAccountId={setDeleteAccountId} />
            </div>
            <AccountBalance balance={formatNumber(balance)} />
        </div>
    )
}

export const AccountHolder = (props) => {
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