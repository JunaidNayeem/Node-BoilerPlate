import express from 'express';
const router = express.Router();
import {login} from "../controllers/auth.js";
import API_ROUTES from '../constant/api.constants.js';

router.post(API_ROUTES.AUTH.LOGIN, login);

export default router;