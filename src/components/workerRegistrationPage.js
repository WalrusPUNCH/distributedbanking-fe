import React, { useState } from 'react';
import { Logo } from './logo';
import { Notif } from './notif';
import { registerAdmin } from "../api/identity";

export const WorkerRegistrationPage = () => {
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
            await registerAdmin(user);
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
            },
            position: user.position.value,
            address: {
                country: user.country.value,
                region: user.region.value,
                city: user.city.value,
                street: user.street.value,
                building: user.building.value,
                postalCode: user.postalCode.value,
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
            user.position.value = '';
            user.country.value = '';
            user.region.value = '';
            user.city.value = '';
            user.street.value = '';
            user.building.value = '';
            user.postalCode.value = '';
        }
    }

    return (
        <div id="registration">
            <section id="main-content">
                <Logo/>
                <form id="form" onSubmit={handleCreateAccount}>
                    <h1 className="center">Administrator Registration</h1>

                    <Notif message={notif.message} style={`${notif.style} center`}/>

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

                    <label htmlFor="position">Position name</label>
                    <input id="position" type="text" autoComplete="off" name="position"/>

                    <hr/>

                    <label htmlFor="documentNumber">Passport document number</label>
                    <input id="documentNumber" type="number" autoComplete="off" name="documentNumber"/>

                    <label htmlFor="issuer">Passport issuer</label>
                    <input id="issuer" type="text" autoComplete="off" name="issuer"/>

                    <label htmlFor="issueDateTime">Passport issue date</label>
                    <input id="issueDateTime" type="date" autoComplete="off" name="issueDateTime"/>

                    <label htmlFor="expirationDateTime">Passport expiration date</label>
                    <input id="expirationDateTime" type="date" autoComplete="off" name="expirationDateTime"/>

                    <hr/>
                    <h2 className="center">Home address</h2>

                    <label htmlFor="country">Country</label>
                    <input id="country" type="text" autoComplete="off" name="country"/>

                    <label htmlFor="region">Region</label>
                    <input id="region" type="text" autoComplete="off" name="region"/>

                    <label htmlFor="city">City</label>
                    <input id="city" type="text" autoComplete="off" name="city"/>

                    <label htmlFor="street">Street</label>
                    <input id="street" type="text" autoComplete="off" name="street"/>

                    <label htmlFor="building">Building</label>
                    <input id="building" type="text" autoComplete="off" name="building"/>

                    <label htmlFor="postalCode">Postal code</label>
                    <input id="postalCode" type="text" autoComplete="off" name="postalCode"/>

                    <input value="Register" className="btn" type="submit"/>
                </form>
            </section>
        </div>

    )
}