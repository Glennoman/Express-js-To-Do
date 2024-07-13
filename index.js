const express = require("express");
const morgan = require("morgan");
const todosRouter = require("./routes/todos.routes"); // Importing router for todos

const app = express();

const PORT = 3000;

// Middleware to log HTTP requests
app.use(morgan("dev"));

// Middleware to parse JSON body
app.use(express.json());

app.set("view engine", "ejs");

// Mount todos router on "/todos" path
app.use("/todos", todosRouter);

// Route for the root path ("/") that send welcome msg
app.get("/", (req, res) => {
  res.render("home");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});
