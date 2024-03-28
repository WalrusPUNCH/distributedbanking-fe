import React, { useEffect, useState } from "react";
import { Notif } from "./notif";
import { capitalize, formatNumber, trim } from "./utils";
import { makeDeposit, makeWithdrawal } from "../api/transaction";

export const TransactPage = (props) => {
    const { bankAccounts, setUpdateBankAccounts, notif, setNotif, page } = props;
    
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [amount, setAmount] = useState(0);
    const [securityCode, setSecurityCode] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (selectedAccount !== null) {
            changeBalance(selectedAccount.id);
        }
    }, [bankAccounts]);


    const options = bankAccounts.map(account => {
        return <option value={account.id}>{account.name} #{account.id}</option>
    });

    const changeBalance = (accountId) => {
        for(const bankAccount of bankAccounts) {
            if(bankAccount.id === accountId) {
                setSelectedAccount(bankAccount);
                return;
            }
        }

        setSelectedAccount(null);
    }
    
    const displayBalance = (e) => {
        setNotif(notif);
        const selectedAccountId = e.target.value;
        changeBalance(selectedAccountId);
    }

    const onAmount = (e) => {
        setAmount(formatNumber(trim(e.target.value)));
    }

    const onSecurityCode = (e) => {
        setSecurityCode(e.target.value);
    }

    const onDescription = (e) => {
        setDescription(e.target.value);
    }

    const processTransfer = async (e) => {
        e.preventDefault();
        if (amount > 0 && selectedAccount !== null) {
            try {
                if (page === 'deposit') {
                    await makeDeposit({
                        sourceAccountId: selectedAccount.id, 
                        amount: amount, 
                        description: description 
                    });
                }
                else if (page === 'withdraw') {
                    await makeWithdrawal({
                        sourceAccountId: selectedAccount.id, 
                        amount: amount, 
                        description: description, 
                        securityCode: securityCode 
                    });
                }
                
                setAmount(0);
                setSecurityCode('');
                setDescription('');
                setUpdateBankAccounts(true);
                setNotif({message: `${capitalize(page)} successful.`, style: 'success'});
            }
            catch (e) {
                setNotif({message: `${capitalize(page)} failed.`, style: 'danger'});
            }
        }
        else {
            setNotif({message: `${capitalize(page)} failed.`, style: 'danger'});
        }
    }
    
    const icon = page === 'withdraw' ? 'bx bx-down-arrow-alt' : 'bx bx-up-arrow-alt';

    return (
        <section id="main-content">
            <form id="form" onSubmit={processTransfer}>
                <h1>{page}</h1>
                <Notif message={notif.message} style={notif.style}/>
                <label>Account</label>
                <select name="account" onChange={displayBalance}>
                    <option value="0">Select Account</option>
                    {options}
                </select>

                {
                    page === 'withdraw' ? (
                        <div>
                            <label>Security code</label>
                            <input type="text" name="securityCode" value={securityCode} onChange={onSecurityCode} className="right" autoComplete="off"/>
                        </div>
                    ) : null
                }
                
                <label>Current balance</label>
                <input type="text" value={formatNumber(selectedAccount?.balance)} disabled className="right"/>

                <div className="transfer-icon"><i className={icon}></i></div>
                
                <label>Amount to {page}</label>
                <input type="text" name="amount" value={amount} onChange={onAmount} autoComplete="off" className="right big-input"/>

                <label>Description</label>
                <input type="text" name="description" value={description} onChange={onDescription} className="right" autoComplete="off"/>

                <button type="submit" className="btn">{page}</button>
            </form>
        </section>
    )
}