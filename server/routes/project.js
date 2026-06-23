const {
  createProject,
  getProject,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controller/project");
const { authCheck } = require("../middleware/auth");

const router = require("express").Router();

router.post("/project", authCheck, createProject);
router.get("/projects", authCheck, getProject);
router.get("/project/:id", authCheck, getProjectById);
router.put("/project/:id", authCheck, updateProject);
router.delete("/project/:id", authCheck, deleteProject);

module.exports = router;
