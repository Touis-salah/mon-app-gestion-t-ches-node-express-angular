// src/controllers/tasks.controller.js
const Task = require("../models/task.model");

exports.getAllTasks = (req, res) => {
    Task.getAll((err, tasks) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(tasks);
    });
};

exports.getTaskById = (req, res) => {
    Task.getById(req.params.id, (err, task) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
        res.json(task);
    });
};

exports.createTask = (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: "Le titre est obligatoire" });

    Task.create({ title, description }, (err, task) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(task);
    });
};

exports.updateTask = (req, res) => {
    const { title, description, completed } = req.body;
    Task.update({ id: req.params.id, title, description, completed }, (err, changes) => {
        if (err) return res.status(500).json({ error: err.message });
        if (changes === 0) return res.status(404).json({ message: "Tâche non trouvée" });
        res.json({ id: Number(req.params.id), title, description, completed });
    });
};

exports.deleteTask = (req, res) => {
    Task.delete(req.params.id, (err, changes) => {
        if (err) return res.status(500).json({ error: err.message });
        if (changes === 0) return res.status(404).json({ message: "Tâche non trouvée" });
        res.status(204).send();
    });
};
