import React from 'react';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="overlay">
            <div className="modal">
                <p>{message}</p>
                <div>
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={onCancel}>Cancel</button>
    
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;