import React, {useEffect, useState} from "react";
import { Notif } from "./notif";
import {formatNumber, trim} from "./utils";
import {makeTransfer} from "../api/transaction";

export const TransferPage = (props) => {
    const { bankAccounts, setUpdateBankAccounts } = props;

    const [notif, setNotif] = useState({message: 'Transfer money from one account to another.', style: 'left'});
    const [sender, setSender] = useState(null);
    const [receiver, setReceiver] = useState('');
    const [transferAmount, setTransferAmount] = useState(0);
    const [securityCode, setSecurityCode] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (sender !== null) {
            changeBalance(sender.id);
        }
    }, [bankAccounts]);
    
    const changeBalance = (accountId) => {
        for(const bankAccount of bankAccounts) {
            if(bankAccount.id === accountId) {
                setSender(bankAccount);
                return;
            }
        }

        setSender(null);
    }
    
    const senderSelected = (event) => {
        const selectedAccountId = event.target.value;
        changeBalance(selectedAccountId);
    }
    
    const senderOptions = bankAccounts.map(account => {
        return <option value={account.id}>{account.name} #{account.id}</option>
    });

    
    const transferFund = async (event) => 
    {
        event.preventDefault();

        if(transferAmount > 0 && sender !== null && receiver && receiver !== '') 
        {
            try 
            {
                await makeTransfer({
                    sourceAccountId: sender.id,
                    sourceAccountSecurityCode: securityCode,
                    destinationAccountId: receiver,
                    amount: transferAmount, 
                    description: description
                });
                
                setTransferAmount(0);
                setReceiver('');
                setSecurityCode('');
                setDescription('');
                setUpdateBankAccounts(true);
                setNotif({ message: 'Successful transfer.', style: 'success' });
            }
            catch (e) {
                setNotif({message: `Transfer failed.`, style: 'danger'});
            }
        }
        else {
            setNotif({message: `Incomplete information. Missing sender or receiver.`, style: 'danger'});
        }
    }

    const onSecurityCode = (e) => {
        setSecurityCode(e.target.value);
    }
    
    const onAmount = (e) => {
        setTransferAmount(formatNumber(trim(e.target.value)));
    }
    
    const onReceiver = (e) => {
        setReceiver(e.target.value);
    }

    const onDescription = (e) => {
        setDescription(e.target.value);
    }

    const senders =
        <select onChange={senderSelected} name="sender">
            <option>Select Sender</option>
            {senderOptions}
        </select>;
    
    return (
        <section id="main-content">
            <form id="form" onSubmit={transferFund}>
                <h1>Fund Transfer</h1>

                <Notif message={notif.message} style={notif.style}/>

                <h2>Sender</h2>
                <label>From (Sender)</label>
                {senders}

                <label>Current balance</label>
                <input type="text" value={formatNumber(sender?.balance)} disabled className="right"/>

                <label>Security code</label>
                <input type="text" name="securityCode" value={securityCode} onChange={onSecurityCode} className="right"
                       autoComplete="off"/>

                <label>Amount to Transfer</label>
                <input type="text" name="amount" value={transferAmount} onChange={onAmount} autoComplete="off"
                       className="right big-input"/>

                <div className="transfer-icon"><i className='bx bx-down-arrow-alt'></i></div>

                <h2>Receiver</h2>
                <label>To (Receiver)</label>
                <input type="text" name="receiver" value={receiver} onChange={onReceiver} autoComplete="off"
                       className="right big-input"/>

                <label>Description</label>
                <input type="text" name="description" value={description} onChange={onDescription} className="right"  autoComplete="off"/>


                <input type="submit" className="btn" value="Transfer Fund"/>
            </form>
        </section>
    )
}