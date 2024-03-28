import React from 'react';
import { formatNumber } from "./utils";
import {AccountBalance, AccountName, AccountNumber, AccountType} from "./account";

export const AccountShort = (props) => {
    const { accountId, name, type, balance } = props;
    
    return (
        <div className="account">
            <div className="details">
                <AccountName name={name} />
                <AccountNumber accountId={accountId} />
                <AccountType type={type} />
            </div>
            <AccountBalance balance={formatNumber(balance)} />
        </div>
    )
}
