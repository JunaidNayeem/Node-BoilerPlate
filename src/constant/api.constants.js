const API_ROUTES = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password/:token',
        OAUTH_LOGIN: '/auth/oAuthLogin',
        GET_USERS_AND_STORE: '/auth/getEntraIDUsersAndStore',
        GET_USER_BY_ID: '/auth/getEntraIDUsers/:userId',
    },
};

export default API_ROUTES;