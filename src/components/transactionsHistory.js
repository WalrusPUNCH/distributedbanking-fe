import React, { useEffect, useState } from "react";
import { getTransactionsHistory } from "../api/transaction";
import { formatNumber } from "./utils";
import { AccountShort } from "./accountShort";

export const TransactionsHistory = props => {
    const { bankAccounts } = props;

    const [selectedAccount, setSelectedAccount] = useState(null);
    const [transactionsHistory, setTransactionsHistory] = useState([]);

    const bankAccountOptions = bankAccounts.map(account => {
        return <option value={account.id}>{account.name} #{account.id}</option>
    });


    useEffect(() => {
        const getAccountTransactionHistory = async (accountId) =>
        {
            setTransactionsHistory(await getTransactionsHistory(accountId));
        }
        
        if (selectedAccount !== null) {
            getAccountTransactionHistory(selectedAccount.id);
        }
        else{
            setTransactionsHistory([]);
        }
    }, [selectedAccount]);

      
    const changeBankAccount = (e) => 
    {
        for (const bankAccount of bankAccounts) {
            if(bankAccount.id === e.target.value) {
                setSelectedAccount(bankAccount);
                return;
            }
        }

        setSelectedAccount(null);
    }

    const formatTransactionAmount = (transaction) => 
    {
        if (transaction.type === 'Deposit'){
            return transaction.amount;
        }
        else if (transaction.type === 'Withdrawal'){
            return transaction.amount * -1;
        }
        else if (transaction.type === 'Transfer'){
            if (selectedAccount.id === transaction.destinationAccountId){
                return transaction.amount;
            }
            else if (selectedAccount.id === transaction.sourceAccountId){
                return transaction.amount * -1;
            }
        }
        
        return 0;
    }
    
   
    const transactions = (selectedAccount !== null && transactionsHistory && transactionsHistory.length !== 0) 
        ? transactionsHistory.map((transaction, index) => {
                const className = index % 2 === 0 ? 'even' : 'odd'
                return <div className={`transaction-item ${className}`}  key={index}>
                    <div>{new Date(transaction.timestamp).toUTCString()}</div>
                    <div>{transaction.description}</div>
                    <div>{formatNumber(formatTransactionAmount(transaction))}</div>
                </div>
            })
        : null;
        
    return (
            <section id="main-content">
                <h1 className="main">Transactions history</h1>
                <label>Account</label>
                <select name="account" onChange={changeBankAccount} style={{ marginBottom: '10px' }}>
                    <option value="0">Select Account</option>
                    {bankAccountOptions}
                </select>

                {
                    selectedAccount !== null
                        ? (<AccountShort
                            accountId={selectedAccount.id}
                            name={selectedAccount.name}
                            type={selectedAccount.type}
                            owner={selectedAccount.owner}
                            balance={selectedAccount.balance}
                        />) 
                        : null
                }

                {
                    selectedAccount !== null
                        ? (<div id="transactions">
                            <h2>Transactions</h2>
                            <div id="transaction-div">
                                {transactions}
                            </div>
                        </div>)
                        : null
                }
            </section>
    )
}