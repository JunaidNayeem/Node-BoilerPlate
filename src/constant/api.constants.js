const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  PROJECTS: {
    GET: '/projects',
    GET_PUBLIC: "/projects/public",
    GET_BY_USER: '/projects/user/:userId',
    CREATE: '/projects',
    UPDATE: '/projects/:id',
    DELETE: '/projects/:id',
  },
};

export default API_ROUTES;