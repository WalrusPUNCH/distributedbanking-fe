﻿import React, {useEffect, useState} from 'react';
import { loginUser } from '../api/identity';
import { Dashboard } from './dashboard';
import { LoginPage } from './loginPage';
import {ClientDashboardV2} from "./clientDashboardV2";

export const Authentication = () => {
    const [notif, setNotif] = useState({message: '', style: ''});
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);
    
    const login = async (email, password) => {
        try {
            const userData = await loginUser(email, password);
            setUser(userData);
            if (userData.isAdmin) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
            localStorage.setItem('user', JSON.stringify(userData));
            setNotif('');
            return true;
        } catch (error) {
            setNotif({ message: 'Wrong username or password', style: 'danger' });
            return false;
        }
    }
    
    const logout = () => {
        setUser(null);
        setIsAdmin(false);
        localStorage.removeItem('user')
        setNotif({message: 'You have logged out.', style: 'success'});
    }

    useEffect(() => {
        const userFromStorage = JSON.parse(localStorage.getItem('user'));
        if (userFromStorage) {
            setUser(userFromStorage);
            setIsAdmin(userFromStorage.isAdmin);
        }
    }, []); // Empty dependency array ensures this effect runs only once on mount
    
    if (user) {
        if(isAdmin) {
            return <Dashboard logoutHandler={logout} />
        } else {
            return <ClientDashboardV2 user={user} logout={logout} />
        }
    } else {
        return <LoginPage loginHandler={login} notif={notif} />
    }
}