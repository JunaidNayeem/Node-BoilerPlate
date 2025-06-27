import Project from "../models/Project.js"

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.userId })
      .populate("userId", "username email")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      data: projects,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
      error: error.message,
    })
  }
}

export const getPublicProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isPublic: true }).populate("userId", "username email").sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      message: "Public projects fetched successfully",
      data: projects,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching public projects",
      error: error.message,
    })
  }
}

export const getProjectsByUser = async (req, res) => {
  try {
    const { userId } = req.params
    const projects = await Project.find({
      userId,
    })
      .populate("userId", "username email")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      message: "User projects fetched successfully",
      data: projects,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user projects",
      error: error.message,
    })
  }
}

export const createProject = async (req, res) => {
  try {
    const { title, description, thumbnail, category, technologies, github, liveUrl, featured, isPublic } = req.body

    console.log("Creating project with isPublic:", isPublic) 

    const project = new Project({
      title,
      description,
      thumbnail,
      category,
      technologies,
      github,
      liveUrl,
      featured: featured || false,
      isPublic: Boolean(isPublic), 
      userId: req.user.userId,
    })

    const savedProject = await project.save()
    await savedProject.populate("userId", "username email")

    console.log("Created project with isPublic:", savedProject.isPublic) 

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: savedProject,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating project",
      error: error.message,
    })
  }
}

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, thumbnail, category, technologies, github, liveUrl, featured, isPublic } = req.body

    console.log("Updating project with isPublic:", isPublic) 
    const project = await Project.findOne({ _id: id, userId: req.user.userId })

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or unauthorized",
      })
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        thumbnail,
        category,
        technologies,
        github,
        liveUrl,
        featured,
        isPublic: Boolean(isPublic), 
      },
      { new: true },
    ).populate("userId", "username email")

    console.log("Updated project with isPublic:", updatedProject.isPublic)

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating project",
      error: error.message,
    })
  }
}

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params

    const project = await Project.findOne({ _id: id, userId: req.user.userId })

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or unauthorized",
      })
    }

    await Project.findByIdAndDelete(id)

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting project",
      error: error.message,
    })
  }
}
