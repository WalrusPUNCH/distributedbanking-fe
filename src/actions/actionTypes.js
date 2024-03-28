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
        INFORMATION: 'api/identity/customer/information',
    },
    ACCOUNT: {
        ACCOUNT: 'api/account',
        ACCOUNT_BY_ID: 'api/account/',
        OWNED_BY_USER: 'api/account/owned/',
        USERS_ACCOUNTS: 'api/account/my',
    }
};

export default actionTypes;
