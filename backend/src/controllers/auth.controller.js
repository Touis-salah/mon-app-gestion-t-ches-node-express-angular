// const User = require("../models/user.model");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
//
// const JWT_SECRET = "ton_secret_super_secret";    // à mettre en .env
// const REFRESH_SECRET = "ton_refresh_secret";    // à mettre en .env
//
// // REGISTER
// exports.register = (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) return res.status(400).json({ message: "Tous les champs sont requis" });
//
//     User.create({ username, password }, (err, user) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.status(201).json(user);
//     });
// };
//
// exports.login = (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) return res.status(400).json({ message: "Tous les champs sont requis" });
//
//     User.findByUsername(username, async (err, user) => {
//         if (err) return res.status(500).json({ error: err.message });
//         if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
//
//         const valid = await bcrypt.compare(password, user.password);
//         if (!valid) return res.status(401).json({ message: "Mot de passe incorrect" });
//
//         // Access Token (court, 1h)
//         const accessToken = jwt.sign(
//             { id: user.id, username: user.username },
//             JWT_SECRET,
//             { expiresIn: "1h" }
//         );
//
//         // Refresh Token (long, 7 jours)
//         const refreshToken = jwt.sign(
//             { id: user.id, username: user.username },
//             REFRESH_SECRET,
//             { expiresIn: "7d" }
//         );
//
//         res.json({ accessToken, refreshToken });
//     });
// };
//
// // REFRESH TOKEN
// exports.refreshToken = (req, res) => {
//     const { refreshToken } = req.body;
//     if (!refreshToken) return res.status(401).json({ message: "Refresh token manquant" });
//
//     try {
//         const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
//         const accessToken = jwt.sign(
//             { id: decoded.id, username: decoded.username },
//             JWT_SECRET,
//             { expiresIn: "1h" }
//         );
//         res.json({ accessToken });
//     } catch (err) {
//         res.status(401).json({ message: "Refresh token invalide ou expiré" });
//     }
// };



const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "ton_secret_super_secret";   // à mettre dans .env
const REFRESH_SECRET = "ton_refresh_secret";    // à mettre dans .env

// REGISTER sécurisé
exports.register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ message: "Tous les champs sont requis" });

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findByUsername(username);
        if (existingUser)
            return res.status(409).json({ message: "Utilisateur déjà existant" });

        // Créer l'utilisateur (hash effectué dans User.create)
        const user = await User.create({ username, password });

        res.status(201).json({ id: user.id, username: user.username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGIN sécurisé avec async/await
exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ message: "Tous les champs sont requis" });

    try {
        const user = await User.findByUsername(username);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: "Mot de passe incorrect" });

        // Access Token (court, 1h)
        const accessToken = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Refresh Token (long, 7 jours)
        const refreshToken = jwt.sign(
            { id: user.id, username: user.username },
            REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ accessToken, refreshToken });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// REFRESH TOKEN
exports.refreshToken = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken)
        return res.status(401).json({ message: "Refresh token manquant" });

    try {
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
        const accessToken = jwt.sign(
            { id: decoded.id, username: decoded.username },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({ accessToken });
    } catch (err) {
        res.status(401).json({ message: "Refresh token invalide ou expiré" });
    }
};