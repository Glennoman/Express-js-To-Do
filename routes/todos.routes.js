const express = require("express");
const {
  getAllTodos,
  getTodoById,
  createTodo,
  markTodoCompleted,
  deleteTodo,
} = require("../controllers/todos.controller"); // Importing different controller functions

const router = express.Router();

// Route to get all todos from the database
router.get("/", getAllTodos);

// Router to get To Do by ID
router.get("/:id", getTodoById);

// Route to get new To Do
router.post("/", createTodo);

// Route to mark a To Do as completed
router.put("/completed/", markTodoCompleted);

// Route to delete a To Do by ID
router.delete("/:id", deleteTodo);

module.exports = router;
