const router = require("express").Router();

const {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByProject,
} = require("../controller/task");
const { authCheck } = require("../middleware/auth");

router.post("/tasks", authCheck, createTask);
router.get("/tasks/:id", authCheck, getTaskById);
router.put("/tasks/:id", authCheck, updateTask);
router.delete("/tasks/:id", authCheck, deleteTask);
router.get("/projects/:projectId/tasks", authCheck, getTasksByProject);

module.exports = router;
