import React, { useState } from 'react';
import { Logo } from './logo';
import { Notif } from './notif';
import { registerCustomer } from "../api/identity";

export const RegistrationPage = (props) => {
    const { setIsRegistration } = props;
    const [notif, setNotif] = useState({message: '', style: ''});

    
    const createNewAccount = async (user) => {
        const emptyInputs = Object.values(user).filter(input => {
            return input === ''
        });
        
        if(emptyInputs.length > 0) {
            setNotif({message: 'All fields are required.', style: 'danger'});
            return false;
        }
        
        try
        {
            await registerCustomer(user);
            setNotif({message: 'Successfully saved.', style: 'success'});
            return true;
        }
        catch(e)
        {
            setNotif({message: 'Registration failed. Try again.', style: 'danger'});
            return false;
        }
    }

    const handleCreateAccount = async (event) => {
        event.preventDefault();
        const user = event.target.elements;

        const account = {
            firstName: user.firstName.value,
            lastName: user.lastName.value,
            birthDate: user.birthDate.value,
            phoneNumber: user.phoneNumber.value,
            email: user.email.value,
            password: user.password.value,
            passport: {
                documentNumber: user.documentNumber.value,
                issuer: user.issuer.value,
                issueDateTime: user.issueDateTime.value,
                expirationDateTime: user.expirationDateTime.value,
            }
        }

        const isSaved = await createNewAccount(account);
        if(isSaved) {
            user.firstName.value = '';
            user.lastName.value = '';
            user.birthDate.value = '';
            user.phoneNumber.value = '';
            user.email.value = '';
            user.password.value = '';
            user.documentNumber.value = '';
            user.issuer.value = '';
            user.issueDateTime.value = '';
            user.expirationDateTime.value = '';

            setIsRegistration(false);
        }
    }
    
    return (
        <div id="registration">
            <section id="main-content">
                <Logo/>
                <form id="form" onSubmit={handleCreateAccount}>
                    <h1 className="center">Customer Registration</h1>

                    <Notif message={notif.message} style={`${notif.style} center`} />

                    <label htmlFor="firstName">First name</label>
                    <input id="firstName" type="text" autoComplete="off" name="firstName"/>

                    <label htmlFor="lastName">Last name</label>
                    <input id="lastName" type="text" autoComplete="off" name="lastName"/>

                    <label htmlFor="birthDate">Birth date</label>
                    <input id="birthDate" type="date" autoComplete="off" name="birthDate"/>

                    <label htmlFor="phoneNumber">Phone number</label>
                    <input id="phoneNumber" type="tel" autoComplete="off" name="phoneNumber"/>

                    <hr/>

                    <label htmlFor="email">Email address</label>
                    <input id="email" type="email" name="email"/>

                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password"/>

                    <hr/>

                    <label htmlFor="documentNumber">Passport document number</label>
                    <input id="documentNumber" type="number" autoComplete="off" name="documentNumber"/>

                    <label htmlFor="issuer">Passport issuer</label>
                    <input id="issuer" type="text" autoComplete="off" name="issuer"/>

                    <label htmlFor="issueDateTime">Passport issue date</label>
                    <input id="issueDateTime" type="date" autoComplete="off" name="issueDateTime"/>

                    <label htmlFor="expirationDateTime">Passport expiration date</label>
                    <input id="expirationDateTime" type="date" autoComplete="off" name="expirationDateTime"/>

                    <input value="Register" className="btn" type="submit"/>
                </form>
            </section>
        </div>

    )
}