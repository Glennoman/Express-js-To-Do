const {
  getAllTodos,
  getTodoById,
  createTodo,
  markTodoCompleted,
  deleteTodo,
} = require("../services/todos.service");

// Controller function to get all todos
exports.getAllTodos = (req, res) => {
  const todos = getAllTodos();
  res.json(todos);
};

// Controller function to get a ToDo by ID
exports.getTodoById = (req, res) => {
  const id = parseInt(req.params.id);
  const todo = getTodoById(id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found!" });
  }
  res.json(todo);
};

// Conroller function to create a new To Do
exports.createTodo = (req, res) => {
  const { title, dueDate, description } = req.body; // Extract title and description from the request body
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  // Create a new To Do object with the extracted title and description
  const newTodo = {
    id: Date.now(),
    title, // Equivalent to title: title
    dueDate, // Equivalent to dueDate: dueDate
    description: description || "", // description is either the provided description or an empty string
    isCompleted: false, // Why isCompleted is set to false? // Because a new To Do is not completed by default
  };
  const todo = createTodo(newTodo);
  res.status(201).json(todo);
};

// Controller function to mark a To Do as completed
exports.markTodoCompleted = (req, res) => {
  const id = parseInt(req.body.id); // Extract the ID from the request parameters
  const todo = markTodoCompleted(id); // Mark the To Do as completed
  if (!todo) {
    return res.status(404).json({ error: "Todo not found!" });
  }
  res.json(todo);
};

// Controller function to delete a To Do by ID
exports.deleteTodo = (req, res) => {
  const id = parseInt(req.params.id); // Extract the ID from the request parameters
  const todo = deleteTodo(id); // Delete the To Do by ID
  if (!todo) {
    return res.status(404).json({ error: "Todo not found!" });
  }
  res.status(204).send(); // Send a success response with no content
};
