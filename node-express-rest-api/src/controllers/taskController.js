const tasks = require("../data/tasks");

const getTasks = (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
};

const getTaskById = (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  res.status(200).json({
    success: true,
    data: task
  });
};

const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title is required"
    });
  }

  const newTask = {
    id: tasks.length
      ? Math.max(...tasks.map((task) => task.id)) + 1
      : 1,
    title: title.trim(),
    description: description ? description.trim() : "",
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask
  });
};

const updateTask = (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  const { title, description, completed } = req.body;

  if (title !== undefined && title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title cannot be empty"
    });
  }

  if (title !== undefined) {
    task.title = title.trim();
  }

  if (description !== undefined) {
    task.description = description.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Completed must be a boolean"
      });
    }

    task.completed = completed;
  }

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task
  });
};

const deleteTask = (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  const deletedTask = tasks.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: deletedTask
  });
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};