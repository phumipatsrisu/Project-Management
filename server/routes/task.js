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
router.get("/task/:id", authCheck, getTaskById);
router.put("/task/:id", authCheck, updateTask);
router.delete("/task/:id", authCheck, deleteTask);
router.get("/projects/:projectId/tasks", authCheck, getTasksByProject);

module.exports = router;
