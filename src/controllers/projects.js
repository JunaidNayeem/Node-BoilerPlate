import httpStatus from 'http-status-codes';
import Project from '../models/Project.js';

const errorResponse = (res, error) => {
  console.error('Error in projects controller:', error);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Server error',
  });
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.userId });
    return res.status(httpStatus.OK).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getProjectsByUser = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.params.userId });
    return res.status(httpStatus.OK).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const createProject = async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      userId: req.user.userId,
    };
    const project = new Project(projectData);
    await project.save();
    req.io.emit('projectUpdate', { action: 'create', project });
    return res.status(httpStatus.CREATED).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!project) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Project not found or unauthorized.',
      });
    }
    Object.assign(project, req.body);
    await project.save();
    req.io.emit('projectUpdate', { action: 'update', project });
    return res.status(httpStatus.OK).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!project) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Project not found or unauthorized.',
      });
    }
    req.io.emit('projectUpdate', { action: 'delete', project });
    return res.status(httpStatus.OK).json({
      success: true,
      message: 'Project deleted.',
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};