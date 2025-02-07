const User = require("../models/User");
const store = require("../models/Store");

// Purchase a game
const purchaseGame = (req, res) => {
    const { username, gameTitle } = req.body;

    // Validate request body
    if (!username || !gameTitle) {
        return res.status(400).json({ success: false, message: "Username and game title are required." });
    }

    // Find the user
    const user = User.find({ username });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
    }

    // Find the game
    const game = store.gameList.find(g => g.title === gameTitle);
    if (!game) {
        return res.status(404).json({ success: false, message: `Game "${gameTitle}" not found.` });
    }

    // Attempt to purchase the game
    const result = user.purchaseGame(game);
    if (result.success) {
        return res.status(200).json({ success: true, message: result.message });
    } else {
        return res.status(400).json({ success: false, message: result.message });
    }
};

// Download a game
const downloadGame = (req, res) => {
    const { username, gameTitle } = req.body;

    // Validate request body
    if (!username || !gameTitle) {
        return res.status(400).json({ success: false, message: "Username and game title are required." });
    }

    // Find the user
    const user = User.find({ username });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
    }

    // Find the game
    const game = store.gameList.find(g => g.title === gameTitle);
    if (!game) {
        return res.status(404).json({ success: false, message: `Game "${gameTitle}" not found.` });
    }

    // Attempt to download the game
    const result = user.downloadGame(game);
    if (result.success) {
        return res.status(200).json({ success: true, message: result.message });
    } else {
        return res.status(400).json({ success: false, message: result.message });
    }
};

// Get user details
const getUser = (req, res) => {
    const { username } = req.body;

    // Validate request body
    if (!username) {
        return res.status(400).json({ success: false, message: "Username is required." });
    }

    // Find the user
    const user = User.find({ username });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
    }

    // Return user details (excluding sensitive information like password)
    const userDetails = {
        username: user.username,
        email: user.email,
        balance: user.balance,
        ownedGames: user.ownedGames,
        banned: user.banned
    };
    return res.status(200).json({ success: true, user: userDetails });
};

module.exports = { purchaseGame, downloadGame, getUser };