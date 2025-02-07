const express = require('express');
const { getAllGames, addGame, deleteGame } = require('../controllers/gameController');
const router = express.Router();

// Get all games
router.get('/getAllGames', (req, res) => {
    getAllGames(req, res);
});

// Add a new game
router.post('/addGame', (req, res) => {
    const { title, developer, price, files } = req.body;

    // Validate request body
    if (!title || !developer || price === null || !files || files.length === 0) {
        return res.status(400).json({ success: false, message: "Missing required fields: title, developer, price, or files." });
    }

    addGame(req, res);
});

// Delete a game
router.delete('/deleteGame/:title', (req, res) => {
    const { title } = req.params;

    // Validate request parameters
    if (!title) {
        return res.status(400).json({ success: false, message: "Game title is required." });
    }

    deleteGame(req, res);
});

module.exports = router;