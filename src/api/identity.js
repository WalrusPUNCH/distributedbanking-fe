import axios from 'axios';
import actionTypes from '../actions/actionTypes';
import ActionTypes from "../actions/actionTypes";

// Function to perform login
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${actionTypes.HOST}${ActionTypes.IDENTITY.LOGIN}`, { email, password });
        return response.data.value.token;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Add more functions for other API endpoints as needed
