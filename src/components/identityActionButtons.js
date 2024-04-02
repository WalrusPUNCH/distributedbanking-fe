import React, {useState} from "react";
import ConfirmationDialog from "./confirmationDialog";

export const IdentityActionButtons = (props) => {
    const { setEditModal, setDeleteUser } = props;
    const [showConfirmationBox, setShowConfirmationBox] = useState(false);

    const handleConfirmDelete = () => {
        setDeleteUser(true);
        setShowConfirmationBox(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmationBox(false);
    };
    
    
    return (
        <div id="actions">
            <IdentityActionButton
                icon="bx bx-edit"
                text="Edit"
                actionType='edit'
                setEditModal={setEditModal} />

            <IdentityActionButton
                icon="bx bxs-x-square"
                actionType='delete'
                text="Delete"
                setShowConfirmationBox={setShowConfirmationBox} />

            {showConfirmationBox && (
                <ConfirmationDialog
                    message="Are you sure you want to delete your profile?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    )
}


export const IdentityActionButton = (props) => {
    const { icon, text, actionType, setEditModal, setShowConfirmationBox } = props;

    const click = (e) => {
        e.preventDefault();

        if(actionType === 'edit') {
            setEditModal(true);
        }

        if(actionType === 'delete') {
            setShowConfirmationBox(true);
        }
    }

    return (
        <button onClick={(e) => click(e)}><i className={icon} ></i> {text}</button>
    )
}