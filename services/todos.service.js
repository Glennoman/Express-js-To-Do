const fs = require("fs");
const path = require("path");
const todosFilePath = path.join(__dirname, "../data/todos.json");

// Function to read To Do data from JSON file
const readTodos = () => {
  try {
    // Read the JSON file and parse the data into an array
    const data = fs.readFileSync(todosFilePath);
    return JSON.parse(data);
    // If the file is empty, return an empty array
  } catch (err) {
    // Log the error and return an empty array
    console.error("Error reading To Do data from file", err);
    return [];
  }
};

// function to write To Do data to JSON file
const writeTodos = (todos) => {
  try {
    // Write the To Do data array to the JSON file with proper formatting
    fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2));
  } catch (err) {
    // Log the error
    console.error("Error writing To Do data to file", err);
  }
};

// Service function to get all To Dos
const getAllTodos = () => {
  return readTodos();
};

// Service function to get a To Do by ID
const getTodoById = (id) => {
  // Find the To Do with the specified ID
  const todos = readTodos();
  // Return the To Do if found, otherwise return undefined (falsy value)
  return todos.find((todo) => todo.id === id);
};

// Service function to create a new To Do
const createTodo = (newTodo) => {
  const todos = readTodos();
  // Add the new To Do to the existing To Do array
  todos.push(newTodo);
  // Write the updated To Do array back to the JSON file
  writeTodos(todos);
  // Return the newly created To Do
  return newTodo;
};

// Service function to mark a To Do as completed
const markTodoCompleted = (id) => {
  const todos = readTodos();
  // Find the To Do with the specified ID
  const todo = todos.find((todo) => todo.id === id);
  // If the To Do is found, mark it as completed and write the updated data to the file
  if (todo) {
    todo.isCompleted = true;
    writeTodos(todos);
  }
  // Return the updated To Do (either marked as completed or the original To Do)
  return todo;
};

// Service function to delete a To Do by ID
const deleteTodo = (id) => {
  // Read the existing To Do data from the file
  let todos = readTodos();
  // Find the To Do with the specified ID and remove it from the array
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    // Filter out the To Do with the specified ID
    todos = todos.filter((todo) => todo.id !== id);
    // Write the updated To Do data back to the file
    writeTodos(todos);
    return todo;
  }
  return null;
};

// Export the service functions for use in the controller
module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  markTodoCompleted,
  deleteTodo,
};
