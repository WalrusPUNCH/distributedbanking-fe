import React from "react";
import {IdentityActionButtons} from "./identityActionButtons";

export const IdentityInformation = (props) => {

    const { firstName, lastName, phoneNumber, email, setEditModal, setDeleteUser } = props;
    
    return (
        <div className="identity">
            <div className="details">
                <User firstName={firstName} lastName={lastName} />
                <PhoneNumber phoneNumber={phoneNumber} />
                <Email email={email} />
                <IdentityActionButtons
                    setEditModal={setEditModal}
                    setDeleteUser={setDeleteUser} />
            </div>
        </div>
    )
}

export const User = (props) => {
    const { firstName, lastName } = props;

    return (
        <h1>{firstName} {lastName}</h1>
    )
}


export const PhoneNumber = (props) => {
    const { phoneNumber } = props;
    return (
        <h3>{phoneNumber}</h3>
    )
}


export const Email = (props) => {
    const { email } = props;

    return (
        <div>{email}</div>
    )
}
