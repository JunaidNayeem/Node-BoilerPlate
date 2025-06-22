import express from 'express';
import authRoutes from './AuthRoute.js';
import projectRoutes from './ProjectRoute.js';

const router = express.Router();

const routes = [
  {
    path: '/',
    route: authRoutes,
  },
  {
    path: '/',
    route: projectRoutes,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;