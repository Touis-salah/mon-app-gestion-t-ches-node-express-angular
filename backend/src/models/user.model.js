const db = require("../database/db");
const bcrypt = require("bcrypt");

class User {
    // Créer un utilisateur (hash ici)
    static async create({ username, password }) {
        const hashedPassword = await bcrypt.hash(password, 10); // hash unique
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO users (username, password) VALUES (?, ?)",
                [username, hashedPassword],
                function (err) {
                    if (err) reject(err);
                    else resolve({ id: this.lastID, username });
                }
            );
        });
    }

    // Chercher un utilisateur par username
    static async findByUsername(username) {
        return new Promise((resolve, reject) => {
            db.get(
                "SELECT * FROM users WHERE username = ?",
                [username],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row); // null si aucun utilisateur trouvé
                }
            );
        });
    }
}

module.exports = User;



// const db = require("../database/db");
// const bcrypt = require("bcrypt");
//
// const User = {
//     create: async ({ username, password }, callback) => {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         db.run(
//             "INSERT INTO users (username, password) VALUES (?, ?)",
//             [username, hashedPassword],
//             function (err) {
//                 callback(err, { id: this.lastID, username });
//             }
//         );
//     },
//
//     findByUsername: (username, callback) => {
//         db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
//             callback(err, row);
//         });
//     }
// };
//
// module.exports = User;