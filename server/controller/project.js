const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const owner = req.user.id;
    const { projectName, description } = req.body;
    const project = new Project({
      projectName: projectName,
      description: description,
      owner: owner,
      members: [],
    });

    await project.save();
    res.status(200).json({ message: "Create project success!", project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.getProject = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ owner: req.user.id }, { members: req.user.id }],
    });
    res.status(200).json({ message: "Project data!", projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Projects not found!" });
    }
    res.status(200).json({ message: "Project data by id!", project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { projectName, description } = req.body;
    const project = await Project.findByIdAndUpdate(
      projectId,
      { projectName, description },
      {
        new: true,
      },
    );
    if (!project) {
      return res.status(404).json({ message: "Projects not found!" });
    }
    res.status(200).json({ message: "Project updated!", project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      return res.status(404).json({ message: "Projects not found!" });
    }
    res.status(200).json({ message: "Project deleted!", project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};
