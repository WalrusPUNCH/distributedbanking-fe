import React from 'react';
import { formatNumber } from "./utils";
import { AccountBalance, AccountName, AccountNumber, AccountOwner, AccountSecurityCode, AccountType } from "./account";

export const AccountShort = (props) => {
    const { accountId, name, type, securityCode, owner, balance } = props;
    
    return (
        <div className="account">
            <div className="details">
                <AccountName name={name} />
                <AccountNumber accountId={accountId} />
                <AccountType type={type} />
                {typeof securityCode !== "undefined" && securityCode !== '' ? (<AccountSecurityCode securityCode={securityCode}/>) : null}
                {typeof owner !== "undefined" && owner !== '' ? (<AccountOwner owner={owner}/>) : null}
            </div>
            <AccountBalance balance={formatNumber(balance)} />
        </div>
    )
}
