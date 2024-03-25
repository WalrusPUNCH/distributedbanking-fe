import React, {useState} from 'react';
import { loginUser } from '../api/identity';
import { Dashboard } from './dashboard';
import { LoginPage } from './loginPage';
import { ClientDashboard } from './clientDashboard';

export const Authentication = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notif, setNotif] = useState({message: '', style: ''});
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState(null);
    
    const isLoginSuccess = async (email, password) => {
        try {
            const userToken = await loginUser(email, password);
            //if (userData.isAdmin) {
            //    setIsAdmin(true);
            //} else {
                setIsAdmin(false);
            //}
            setToken(userToken);
            localStorage.setItem('token', userToken);
            setNotif('');
            return true;
        } catch (error) {
            setNotif({ message: 'Wrong username or password', style: 'danger' });
            return false;
        }
    }

    const login = async (username, password) => {
        const success = await isLoginSuccess(username, password);
        if (success) {
            setIsLoggedIn(true);
        }
    }

    const logout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        localStorage.removeItem('token')
        setNotif({message: 'You have logged out.', style: 'success'});
    }

    if(isLoggedIn) {
        if(isAdmin) {
            return <Dashboard /*users={clients}*/ logoutHandler={logout} />
        } else {
            return <ClientDashboard client={client} /*users={clients}*/ setClient={setClient} logout={logout} />
        }
    } else {
        return <LoginPage loginHandler={login} notif={notif} isLoggedIn={isLoggedIn} />
    }
}