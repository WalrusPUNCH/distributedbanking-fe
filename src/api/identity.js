import axios from 'axios';
import { axiosAuth } from "../actions/axiosAuth";
import actionTypes from '../actions/actionTypes';

export const registerCustomer = async (newCustomer) => {
    try {
        const { firstName, lastName, birthDate, phoneNumber, email, password, passport } = newCustomer;
        
        const response = await axios.post(`${actionTypes.HOST}${actionTypes.IDENTITY.REGISTER_CUSTOMER}`, 
            {
                firstName,
                lastName,
                birthDate,
                phoneNumber,
                email,
                password,
                passport
            });
        return response.data;
    } catch (error) {
        console.error('Error logging in: ', error);
        throw error;
    }
};


export const registerAdmin = async (newAdmin) => {
    try {
        const { firstName, lastName, birthDate, phoneNumber, email, password, passport, position, address } = newAdmin;

        const response = await axios.post(`${actionTypes.HOST}${actionTypes.IDENTITY.REGISTER_ADMIN}`,
            {
                firstName,
                lastName,
                birthDate,
                phoneNumber,
                email,
                password,
                passport,
                position,
                address
            });
        return response.data;
    } catch (error) {
        console.error('Error logging in: ', error);
        throw error;
    }
};


export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${actionTypes.HOST}${actionTypes.IDENTITY.LOGIN}`, { email, password });
        return response.data.value;
    } catch (error) {
        console.error('Error logging in: ', error);
        throw error;
    }
};


export const getCustomerIdentityInformation = async () => {
    try {
        const response = await axiosAuth.get(`${actionTypes.HOST}${actionTypes.IDENTITY.CUSTOMER_INFORMATION}`);
        return response.data.value;
    } catch (error) {
        console.error('Error while getting customer identity information: ', error);
        throw error;
    }
};

export const getWorkerIdentityInformation = async () => {
    try {
        const response = await axiosAuth.get(`${actionTypes.HOST}${actionTypes.IDENTITY.WORKER_INFORMATION}`);
        return response.data.value;
    } catch (error) {
        console.error('Error while getting worker identity information: ', error);
        throw error;
    }
};

export const updateIdentityInformation = async (newIdentityInformation) => {
    try {
        const { documentNumber, issuer, issueDateTime, expirationDateTime } = newIdentityInformation;

        const response = await axiosAuth.post(`${actionTypes.HOST}${actionTypes.IDENTITY.UPDATE_PASSPORT}`,
            {
                documentNumber,
                issuer,
                issueDateTime,
                expirationDateTime
            });
        
        return response.data.value;
    } catch (error) {
            console.error('Error while updating identity information: ', error);
        throw error;
    }
};


export const deleteUserIdentity = async () => {
    try {
        await axiosAuth.delete(`${actionTypes.HOST}${actionTypes.IDENTITY.IDENTITY}`);
    } catch (error) {
        console.error('Error while delete user identity: ', error);
        throw error;
    }
};