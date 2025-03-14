import express from "express";
const router = express.Router();

import authRoutes from "./AuthRoute.js";

const routes = [
    {
        path: "/",
        route: authRoutes

    }
];

// Use the routes
routes.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;