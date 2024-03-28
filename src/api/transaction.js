import {axiosAuth} from "../actions/axiosAuth";
import actionTypes from "../actions/actionTypes";


export const makeDeposit = async (depositRequest) => {
    try {
        const { sourceAccountId, amount, description } = depositRequest;

        const response = await axiosAuth.post(`${actionTypes.HOST}${actionTypes.TRANSACTION.DEPOSIT}`,
            {
                sourceAccountId,
                amount,
                description
            });
        return response.data;
    } catch (error) {
        console.error('Error while trying to make deposit: ', error);
        throw error;
    }
};

export const makeWithdrawal = async (withdrawalRequest) => {
    try {
        const { sourceAccountId, amount, description, securityCode } = withdrawalRequest;

        const response = await axiosAuth.post(`${actionTypes.HOST}${actionTypes.TRANSACTION.WITHDRAWAL}`,
            {
                sourceAccountId,
                amount,
                description,
                securityCode
            });
        return response.data;
    } catch (error) {
        console.error('Error while trying to make withdrawal: ', error);
        throw error;
    }
};


export const makeTransfer = async (transferRequest) => {
    try {
        const { sourceAccountId, sourceAccountSecurityCode, destinationAccountId, amount, description } = transferRequest;

        const response = await axiosAuth.post(`${actionTypes.HOST}${actionTypes.TRANSACTION.TRANSFER}`,
            {
                sourceAccountId,
                sourceAccountSecurityCode,
                destinationAccountId,
                amount,
                description
            });
        return response.data;
    } catch (error) {
        console.error('Error while trying to make transfer: ', error);
        throw error;
    }
};

export const getTransactionsHistory = async (accountId) => {
    try {
        const response = await axiosAuth.get(`${actionTypes.HOST}${actionTypes.TRANSACTION.HISTORY}${accountId}`);
        return response.data;
    } catch (error) {
        console.error('Error while trying to make transfer: ', error);
        throw error;
    }
};