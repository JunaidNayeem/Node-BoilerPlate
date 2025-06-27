import express from 'express';
import {
  getProjects,
  getPublicProjects,
  getProjectsByUser,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projects.js';
import { isAuthenticated } from '../middleware/auth.js';
import API_ROUTES from '../constant/api.constants.js';

const router = express.Router();

router.get(API_ROUTES.PROJECTS.GET, isAuthenticated, getProjects);
router.get(API_ROUTES.PROJECTS.GET_PUBLIC, getPublicProjects)
router.get(API_ROUTES.PROJECTS.GET_BY_USER, getProjectsByUser);
router.post(API_ROUTES.PROJECTS.CREATE, isAuthenticated, createProject);
router.put(API_ROUTES.PROJECTS.UPDATE, isAuthenticated, updateProject);
router.delete(API_ROUTES.PROJECTS.DELETE, isAuthenticated, deleteProject);

export default router;