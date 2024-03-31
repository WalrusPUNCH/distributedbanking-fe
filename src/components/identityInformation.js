import React from "react";
import {IdentityActionButtons} from "./identityActionButtons";

export const IdentityInformation = (props) => {

    const { firstName, lastName, phoneNumber, email, address, setEditModal, setDeleteUser } = props;
    
    return (
        <div className="identity">
            <div className="details">
                <User firstName={firstName} lastName={lastName} />
                <PhoneNumber phoneNumber={phoneNumber} />
                <Email email={email} />
                {address !== null ? (<Address address={address}/>) : null}
                {setEditModal !== null && setDeleteUser !== null
                ? (<IdentityActionButtons
                        setEditModal={setEditModal}
                        setDeleteUser={setDeleteUser} />)
                : null}
                
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

export const Address = (props) => {
    const { country, region, city, street, building, postalCode } = props.address;

    return (
        <h3>Home address: {postalCode}, {country}, {region}, {city}, {street} street, #{building}</h3>
    )
}
