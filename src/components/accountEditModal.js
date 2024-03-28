import {useState} from "react";

export const AccountEditModal = (props) => {
    const { documentNumber, issuer, issueDateTime, expirationDateTime, setEditModal, setNewAccount, setIsUpdate } = props;
    const [userInfo, setUserInfo] = useState(
        {documentNumber: documentNumber, issuer: issuer, issueDateTime: issueDateTime, expirationDateTime: expirationDateTime});

    const closeModal = () => {
        setEditModal(false);
    }

    const updateAccount = (e) => {
        e.preventDefault();
        console.log("Update");
        setNewAccount(userInfo);
        setIsUpdate(true);
        closeModal();
    }

    const editDocumentNumber = (e) => {
        const documentNumber = e.target.value;
        setUserInfo({...userInfo, ...{documentNumber: documentNumber}});
    }

    const editIssuer = (e) => {
        const issuer = e.target.value;
        setUserInfo({...userInfo, ...{issuer: issuer}});
    }

    const editIssueDateTime = (e) => {
        const issueDateTime = e.target.value;
        setUserInfo({...userInfo, ...{issueDateTime: issueDateTime}});
    }

    const editExpirationDateTime = (e) => {
        const expirationDateTime = e.target.value;
        setUserInfo({...userInfo, ...{expirationDateTime: expirationDateTime}});
    }
    
    return (
        <div className="overlay">
            <div className="modal">
                <form onSubmit={updateAccount}>
                    <h2 className="title">Edit Document Information</h2>
                    <label>Document number</label>
                    <input name="documentNumber" onChange={editDocumentNumber} value={userInfo.documentNumber}
                           autoComplete="off"/>

                    <label>Issuer</label>
                    <input type="text" name="issuer" onChange={editIssuer} value={userInfo.issuer}
                           autoComplete="off"/>

                    <label>Document Issue Date</label>
                    <input type="date" name="issueDateTime" onChange={editIssueDateTime} value={userInfo.issueDateTime.split('T')[0]} autoComplete="off"/>

                    <label>Document Expiration Date</label>
                    <input type="date" name="expirationDateTime" onChange={editExpirationDateTime} value={userInfo.expirationDateTime.split('T')[0]} autoComplete="off"/>

                    <button type="button" onClick={() => closeModal()} className="btn2 btn-muted">Cancel</button>
                    <button type="submit" className="btn2">Update Document</button>
                </form>
            </div>
        </div>
    )
}