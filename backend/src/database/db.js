// src/database/db.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Crée ou ouvre la base de données
const db = new sqlite3.Database(path.resolve(__dirname, "tasks.db"), (err) => {
    if (err) {
        console.error("Erreur lors de l'ouverture de la base de données", err);
    } else {
        console.log("Connecté à SQLite !");
    }
});

// Crée la table tasks si elle n'existe pas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            completed INTEGER DEFAULT 0
        )
    `);
});

module.exports = db;
