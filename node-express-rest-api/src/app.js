require("dotenv").config();

const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task REST API is running"
  });
});

app.use("/api/tasks", taskRoutes);
app.use("/api/posts", postRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});