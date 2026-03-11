const db = require("../database/db");
const bcrypt = require("bcrypt");

const User = {
    create: async ({ username, password }, callback) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword],
            function (err) {
                callback(err, { id: this.lastID, username });
            }
        );
    },

    findByUsername: (username, callback) => {
        db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
            callback(err, row);
        });
    }
};

module.exports = User;