const Game = require("../models/Game");
const store = require("../models/Store");
const User = require("../models/User");

const getAllGames = (req, res) => {
    res.json({
        games: store.gameList
    });
};

const addGame = (req, res) => {
    const { title, developer, price, files } = req.body;
    if (!title || !developer || price === null || files.length === 0) {
        return res.status(400).json({ error: 'Missing required field' });
    }
    const newGame = new Game(title, developer, price, files);
    store.gameList.push(newGame);
    return res.status(200).json({ message: 'Game Added Successfully' });
};

const deleteGame = (req, res) => {
    const { title } = req.params;
    if (!title) {
        return res.status(400).json({ error: 'Missing required field' });
    }
    const index = store.gameList.findIndex((game) => game.title === title);
    if (index === -1) {
        return res.status(404).json({ error: 'Game not found' });
    }
    store.gameList.splice(index, 1);
    return res.status(200).json({ message: `Game ${title} deleted` });
};

module.exports = { getAllGames, addGame, deleteGame };