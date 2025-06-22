import express from 'express';
const router = express.Router();
import { login, register, getMe } from '../controllers/auth.js';
import { isAuthenticated } from '../middleware/auth.js';
import API_ROUTES from '../constant/api.constants.js';

router.post(API_ROUTES.AUTH.LOGIN, login);
router.post(API_ROUTES.AUTH.REGISTER, register);
router.get(API_ROUTES.AUTH.ME, isAuthenticated, getMe);

export default router;