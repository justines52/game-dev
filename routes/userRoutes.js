const express = require('express');
const { purchaseGame, downloadGame, getUser } = require('../controllers/userControllers');
const { getAllGames } = require('../controllers/gameController');
const router = express.Router();

// Download a game
router.post('/download', (req, res) => {
    if (!req.body.username || !req.body.gameTitle) {
        return res.status(400).json({ success: false, message: "Username and game title are required." });
    }
    downloadGame(req, res);
});

// Get user details
router.get('/getUser', (req, res) => {
    if (!req.query.username) {
        return res.status(400).json({ success: false, message: "Username is required." });
    }
    // Convert query parameter to body for consistency
    req.body = { username: req.query.username };
    getUser(req, res);
});

// Purchase a game
router.post('/purchase', (req, res) => {
    if (!req.body.username || !req.body.gameTitle) {
        return res.status(400).json({ success: false, message: "Username and game title are required." });
    }
    purchaseGame(req, res);
});

// Get all games (from gameController)
router.get('/games', (req, res) => {
    getAllGames(req, res);
});

module.exports = router;
