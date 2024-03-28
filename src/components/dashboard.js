import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
import { MainContent } from "./mainContent";
import { CreateAccountPage } from "./createAccountPage";
import { TransferPage } from "./transferPage";
import { TransactPage } from "./transactPage";
import {AccountEditModal} from "./accountEditModal";

export const Dashboard = (props) => {
    const [page, setPage] = useState('home');
    const [users, setUsers] = useState(props.users);
    const [notif, setNotif] = useState({message: '', style: ''});
    const [editingUser, setEditingUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [newAccount, setNewAccount] = useState(null);

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
        if(deleteUser !== null) {

            const filteredUsers = users.filter((user, index) => {
                return index !== deleteUser
            });

            setUsers(filteredUsers);
            setDeleteUser(null);
            // save
            localStorage.setItem('users', JSON.stringify(filteredUsers));
        }
    }, [deleteUser]);

    useEffect(() => {
        if(isUpdate) {
            const filteredUsers = users.map((user, index) => {
                if(user.number === newAccount.number) {
                    user = {...user, ...newAccount};
                }
                return user;
            });

            setUsers(filteredUsers);
            setIsUpdate(false);
            // save
            localStorage.setItem('users', JSON.stringify(filteredUsers));
        }
    }, [isUpdate]);

    let modal = null;
    if(editingUser !== null && editModal) {
        const user = users[editingUser];
        // accountName={} accountNumber={} balance={}
        modal = <AccountEditModal
            accountName={user.fullname}
            accountNumber={user.number}
            balance={user.balance} 
            setEditModal={setEditModal}
            setIsUpdate={setIsUpdate} 
            setNewAccount={setNewAccount}  />
    }

    if(page === 'home') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
                <MainContent users={users} editingUser={editingUser}
                             setEditModal={setEditModal}
                             setEditingUser={setEditingUser} setDeleteUser={setDeleteUser} />
                {modal}
            </main>
        )
    }

    if(page === 'create-account') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
                <CreateAccountPage users={users} setUsers={setUsers} />
            </main>
        )
    }

    if(page === 'transfer') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
                <TransferPage users={users} setUsers={setUsers} />
            </main>
        )
    }

    if(page === 'deposit') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
                <TransactPage users={users} setUsers={setUsers} notif={notif} setNotif={setNotif} type="add" page={page} />
            </main>
        )
    }

    if(page === 'withdraw') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
                <TransactPage users={users} setUsers={setUsers} notif={notif} setNotif={setNotif} type="subtract" page={page} />
            </main>
        )
    }
}
