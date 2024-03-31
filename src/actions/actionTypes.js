const actionTypes = {
    HOST: 'http://localhost:5221/',
    IDENTITY: {
        REGISTER_CUSTOMER: 'api/identity/register/customer',
        REGISTER_WORKER: 'api/identity/register/worker',
        REGISTER_ADMIN: 'api/identity/register/admin',
        LOGIN: 'api/identity/login',
        LOGOUT: 'api/identity/logout',
        IDENTITY: 'api/identity',
        UPDATE_PASSPORT: 'api/identity/customer/update_passport',
        CUSTOMER_INFORMATION: 'api/identity/customer/information',
        WORKER_INFORMATION: 'api/identity/worker/information',
    },
    ACCOUNT: {
        ACCOUNT: 'api/account',
        ACCOUNT_BY_ID: 'api/account/',
        USERS_ACCOUNTS: 'api/account/my',
    },
    TRANSACTION: {
        DEPOSIT: 'api/transaction/deposit',
        WITHDRAWAL: 'api/transaction/withdraw',
        TRANSFER: 'api/transaction/transfer',
        HISTORY: 'api/transaction/history/'
    }
};

export default actionTypes;
