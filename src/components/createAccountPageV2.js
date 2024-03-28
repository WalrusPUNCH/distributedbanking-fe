import { useState } from "react";
import { Notif } from "./notif";
import { createBankAccount } from "../api/bankAccount";

export const    CreateAccountPageV2 = (props) => {
    const [notif, setNotif] = useState({message: 'Create a new client account.', style: 'left'});

    const createNewAccount = async (accountData) => {
        const emptyInputs = Object.values(accountData).filter(input => {
            return input === ''
        });

        if(emptyInputs.length > 0) {
            setNotif({message: 'All fields are required.', style: 'danger'});
            return false;
            }
        
        try {
            const newAccount = await createBankAccount(accountData.name, accountData.type);
            
            setNotif('');
            setNotif({message: 'Successfully saved.', style: 'success'});
            return true;
        } catch (error) {
            setNotif({ message: 'Unable to create new account', style: 'danger' });
            return false;
        }
    }

    const handleCreateAccount = (event) => {
        event.preventDefault();
        const account = event.target.elements;

        const newAccount = {
            name: account.accountName.value,
            type: account.accountType.value
        }

        const isSaved = createNewAccount(newAccount);
        if(isSaved) {
            account.accountName.value = '';
            account.accountType.value = '';
        }
    }
    
    return (
        <section id="main-content">
            <form id="form" onSubmit={handleCreateAccount}>
                <h1>Create New Account</h1>
                <Notif message={notif.message} style={notif.style} />
                <label htmlFor="accountName">Account name</label>
                <input id="accountName" type="text" autoComplete="off" name="accountName" />
                <label htmlFor="accountType">Account Type</label>
                <select name="accountType">
                    <option value="Regular">Regular</option>
                    <option value="Digital">Digital</option>
                    <option value="GovernmentalSupport">Governmental Support</option>
                </select>
                <hr/>
                <input value="Create Account" className="btn" type="submit" />
            </form>
        </section>
    )
}