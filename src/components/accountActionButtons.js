import React, { useState } from "react";
import ConfirmationDialog from "./confirmationDialog";

export const AccountActionButtons = (props) => {
    const { setDeleteAccountId, accountId, name } = props;
    const [showConfirmationBox, setShowConfirmationBox] = useState(false);

    const handleConfirmDelete = () => {
        if (accountId !== null) {
            setDeleteAccountId(accountId);
        }
        
        setShowConfirmationBox(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmationBox(false);
    };
    
    return (
        <div id="actions">
            <AccountActionButton
                icon="bx bxs-x-square"
                actionType='delete'
                text="Delete"
                setShowConfirmationBox={setShowConfirmationBox} />

            {showConfirmationBox && (
                <ConfirmationDialog
                    message={`Are you sure you want to delete '${name}' account?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
            
        </div>        
    )
}


export const AccountActionButton = (props) => {
    const { icon, text, actionType, setShowConfirmationBox } = props;

    const click = (e) => {
        e.preventDefault();
        
        if(actionType === 'delete') {
            setShowConfirmationBox(true);
        }
    }

    return (
        <button onClick={(e) => click(e)}><i className={icon} ></i> {text}</button>
    )
}