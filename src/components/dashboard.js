import React, {useEffect, useState} from 'react';
import { Sidebar } from './sidebar';
import { getWorkerIdentityInformation } from "../api/identity";
import { allBankAccounts } from "../api/bankAccount";
import { TransactionsHistory } from "./transactionsHistory";
import { MainContent } from "./mainContent";
import { WorkerRegistrationPage } from "./workerRegistrationPage";

export const Dashboard = (props) => {
    const { logout, user } = props;
    const [page, setPage] = useState('home');
    const [identityInformation, setIdentityInformation] = useState(null);
    const [bankAccounts, setBankAccounts] = useState([]);
    const [updateBankAccounts, setUpdateBankAccounts] = useState(false);

    
    const changePageHandler = (pageName) => {
        setPage(pageName);
    }

    
    useEffect(() => {
        const fetchIdentityInformation = async () => {
            try {
                const identityInformationModel = await getWorkerIdentityInformation();
                setIdentityInformation(identityInformationModel);
            } catch (error) {
                console.error("Error fetching worker identity information: ", error);
            }
        };

        fetchIdentityInformation();
    }, []);
    
    
    useEffect(() => {
        const fetchBankAccounts = async () => {
            try {
                const accounts = await allBankAccounts();
                setBankAccounts(accounts);
                setUpdateBankAccounts(false);
            } catch (error) {
                console.error("Error fetching all bank accounts: ", error);
            }
        };

        fetchBankAccounts();
    }, [updateBankAccounts]);
    
    
    if (page === 'home') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} user={user} logoutHandler={logout}/>
                <MainContent identityInformation={identityInformation}
                             accounts={bankAccounts}
                             setUpdateBankAccounts={setUpdateBankAccounts}/>
            </main>
        )
    }
    
    if(page === 'history') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} user={user} logoutHandler={logout}/>
                <TransactionsHistory bankAccounts={bankAccounts} />
            </main>
        )
    }

    if (page === 'register-admin') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} user={user} logoutHandler={logout}/>
                <WorkerRegistrationPage/>
            </main>
        )
    }
}