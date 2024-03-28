﻿import React, {useEffect, useState} from 'react';
import { Sidebar } from './sidebar';
import { TransferPage } from './transferPage';
import {MainClientContentV2} from "./mainClientContentV2";
import {TransactPage} from "./transactPage";
import {deleteUserIdentity, getIdentityInformation, updateIdentityInformation} from "../api/identity";
import {CreateAccountPageV2} from "./createAccountPageV2";
import {AccountEditModal} from "./accountEditModal";
import {userBankAccounts} from "../api/bankAccount";

export const ClientDashboardV2 = (props) => {
    const { logout, user } = props;
    const [ page, setPage ] = useState('home');
    const [notif, setNotif] = useState({message: '', style: ''});
    const [deleteUser, setDeleteUser] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [newAccount, setNewAccount] = useState(null);
    const [identityInformation, setIdentityInformation] = useState(null);
    const [bankAccounts, setBankAccounts] = useState([]);

    
    const changePageHandler = (pageName) => {
        setPage(pageName);

        if(pageName === 'withdraw') {
            setNotif({message: 'Select an account to withdraw money from.', style: 'left'});
        }

        if(pageName === 'deposit') {
            setNotif({message: 'Select an account to deposit money.', style: 'left'});
        }
    }

    
    useEffect(() => {
        const fetchIdentityInformation = async () => {
            try {
                const identityInformationModel = await getIdentityInformation();
                setIdentityInformation(identityInformationModel);
            } catch (error) {
                console.error("Error fetching identity information: ", error);
            }
        };

        fetchIdentityInformation();
    }, [isUpdate, deleteUser]);
    
    
    useEffect(() => {
        const deleteUserIdentityLocal = async() =>{
            await deleteUserIdentity();
            setDeleteUser(false);
        }
        
        if (deleteUser) {
            deleteUserIdentityLocal();
        }
    }, [deleteUser]);
    
    
    useEffect(() => {
        const updateIdentityInformationLocal = async(newIdentityInformation) =>
        {
            await updateIdentityInformation(newIdentityInformation);
            setIsUpdate(false);
        }
        
        if(isUpdate) {
            updateIdentityInformationLocal(newAccount);
        }
    }, [isUpdate]);

    useEffect(() => {
        const fetchBankAccounts = async () => {
            try {
                const accounts = await userBankAccounts();
                setBankAccounts(accounts);
            } catch (error) {
                console.error("Error fetching bank accounts: ", error);
            }
        };

        fetchBankAccounts();
    });
    
    let modal = null;
    if(editModal) {
        modal = <AccountEditModal
            documentNumber={identityInformation.passport.documentNumber}
            issuer={identityInformation.passport.issuer}
            issueDateTime={identityInformation.passport.issueDateTime}
            expirationDateTime={identityInformation.passport.expirationDateTime}
            setEditModal={setEditModal}
            setNewAccount={setNewAccount}
            setIsUpdate={setIsUpdate}
        />
    }
    
    
    if (page === 'home') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} user={user} logoutHandler={logout}/>
                <MainClientContentV2 identityInformation={identityInformation}
                                     accounts={bankAccounts}
                                     setEditModal={setEditModal}
                                     setDeleteUser={setDeleteUser} />
                {modal}
            </main>
        )
    }

    if(page === 'create-account') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} user={user} logoutHandler={logout}/>
                <CreateAccountPageV2/>
            </main>
        )
    }
    
    if(page === 'deposit') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} user={user} logoutHandler={logout}/>
                <TransactPage bankAccounts={bankAccounts} notif={notif} setNotif={setNotif} type="add" page={page} />
            </main>
        )
    }

    if(page === 'withdraw') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} user={user} logoutHandler={logout}/>
                <TransactPage bankAccounts={bankAccounts} notif={notif} setNotif={setNotif} type="subtract" page={page} />
            </main>
        )
    }

    if(page === 'transfer') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} user={user} logoutHandler={logout}/>
                <TransferPage /*users={users} setUsers={setUsers}*/ />
            </main>
        )
    }
}