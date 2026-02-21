// src/models/task.model.js
const db = require("../database/db");

const Task = {
    getAll: (callback) => {
        db.all("SELECT * FROM tasks", [], (err, rows) => {
            callback(err, rows);
        });
    },

    getById: (id, callback) => {
        db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
            callback(err, row);
        });
    },

    // create: ({ title, description }, callback) => {
    //     db.run(
    //         "INSERT INTO tasks (title, description) VALUES (?, ?)",
    //         [title, description],
    //         function (err) {
    //
    //             if (err) return callback(err);
    //
    //             // récupérer la tâche avec created_at
    //             db.get(
    //                 "SELECT * FROM tasks WHERE id = ?",
    //                 [this.lastID],
    //                 (err, row) => {
    //                     callback(err, row);
    //                 }
    //             );
    //         }
    //     );
    // },
    create: ({title, description}, callback) => {
        db.run(
            "INSERT INTO tasks (title, description) VALUES (?, ?)",
            [title, description],
            function (err) {
                callback(err, {id: this.lastID, title, description, completed: 0});
            }
        );
    },

    update: ({id, title, description, completed}, callback) => {
        db.run(
            "UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?",
            [title, description, completed ? 1 : 0, id],
            function (err) {
                callback(err, this.changes);
            }
        );
    },

    delete: (id, callback) => {
        db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
            callback(err, this.changes);
        });
    }
};

module.exports = Task;
