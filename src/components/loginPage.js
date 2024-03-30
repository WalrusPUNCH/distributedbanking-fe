import React, { useState } from 'react';
import { Logo } from './logo';
import { Notif } from './notif';

export const LoginPage = (props) => {
    const { loginHandler, notif, setIsRegistration } = props;
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = (event) => {
        event.preventDefault();
        loginHandler(username, password);
    }

    const onChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div id="login-page">
            <div id="login">
                <Logo/>
                <Notif message={notif.message} style={notif.style}/>
                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" autoComplete="off" onChange={onChangeUsername} value={username} type="text"/>
                    <label htmlFor="password">Password</label>
                    <input id="password" autoComplete="off" onChange={onChangePassword} value={password}
                           type="password"/>
                    <button type="submit" className="btn">Login</button>
                </form>
                <hr/>
                <button type="button" className="btn" onClick={() => setIsRegistration(true)}>Registration</button>
            </div>
        </div>
    )
}