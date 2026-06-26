const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { task, status, project, assignee, dueDate } = req.body;

    if (!project) {
      return res.status(400).json({ message: "Project id is required!" });
    }
    const newTask = new Task({
      task,
      status,
      project,
      assignee,
      dueDate,
    });

    await newTask.save();
    res.status(200).json({ message: "Create tasks success!", task: newTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

// GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.status(200).json({ message: "Task data by id!", task: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { task, status, project, assignee, dueDate } = req.body;
    const newTask = await Task.findByIdAndUpdate(
      taskId,
      {
        task,
        status,
        project,
        assignee,
        dueDate,
      },
      { new: true },
    );

    if (!newTask) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res.status(200).json({ message: "Task updated!", task: newTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res.status(200).json({ message: "Task deleted!", task: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

// GET /api/projects/:projectId/tasks
exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ project: projectId });
    res.status(200).json({ message: "Tasks data!", tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};
