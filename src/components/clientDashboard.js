import React, {useState} from 'react';
import { Sidebar } from './sidebar';
import { TransferPage } from './transferPage';
import { BudgetApp } from './budgetApp';
import {MainClientContentV2} from "./mainClientContentV2";

export const ClientDashboard = (props) => {
    const { logout, user, setUser } = props;
    const [ page, setPage ] = useState('home');


    const changePageHandler = (pageName) => {
        setPage(pageName);
    }

    if(page === 'home') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} user={user} logoutHandler={logout} />
                <MainClientContentV2 user={user} />
            </main>
        )
    }

    if(page === 'budget') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} user={user} logoutHandler={logout} />
                <BudgetApp client={user} />
            </main>
        )
    }

    if(page === 'transfer') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} user={user} logoutHandler={logout} />
                <TransferPage isClient="true" client={user} setClient={setUser} /*users={users} setUsers={setUsers} */ />
            </main>
        )
    }
}