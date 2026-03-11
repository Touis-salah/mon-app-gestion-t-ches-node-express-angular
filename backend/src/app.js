const express = require("express");
const cors = require("cors");
const app = express();
const tasksRoutes = require("./routes/tasks.routes");
const authRoutes = require("./routes/auth.routes");

app.use(cors());
app.use(express.json());

// Routes
app.use("/tasks", tasksRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API de gestion de tâches avec SQLite !");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});