import {axiosAuth} from "../actions/axiosAuth";
import actionTypes from '../actions/actionTypes';

export const allBankAccounts = async () => {
    try {
        const response = await axiosAuth.get(`${actionTypes.HOST}${actionTypes.ACCOUNT.ACCOUNT}`);
        return response.data.value;
    } catch (error) {
        console.error('Error while trying to get all accounts: ', error);
        throw error;
    }
};


export const userBankAccounts = async () => {
    try {
        const response = await axiosAuth.get(`${actionTypes.HOST}${actionTypes.ACCOUNT.USERS_ACCOUNTS}`);
        return response.data.value;
    } catch (error) {
        console.error('Error while trying to get customer accounts: ', error);
        throw error;
    }
};

export const createBankAccount = async (name, type) => {
    try {
        const response = await axiosAuth.post(`${actionTypes.HOST}${actionTypes.ACCOUNT.ACCOUNT}`, { name, type });
        return response.data;
    } catch (error) {
        console.error('Error while trying to create new account: ', error);
        throw error;
    }
};


export const deleteBankAccount = async (accountId) => {
    try {
        const response = await axiosAuth.delete(`${actionTypes.HOST}${actionTypes.ACCOUNT.ACCOUNT_BY_ID}${accountId}`);
        return response.data;
    } catch (error) {
        console.error('Error while trying to delete account: ', error);
        throw error;
    }
};
