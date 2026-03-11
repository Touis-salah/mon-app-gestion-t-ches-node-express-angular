const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", tasksController.getAllTasks);
router.get("/:id", tasksController.getTaskById);

// Routes protégées
router.post("/", authMiddleware, tasksController.createTask);
router.put("/:id", authMiddleware, tasksController.updateTask);
router.delete("/:id", authMiddleware, tasksController.deleteTask);

module.exports = router;