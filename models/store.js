// Store.js
const Game = require('./Game');

class Store {
    constructor(gameList = [], featuredGames = [], discounts = []) {
        this.gameList = gameList;
        this.featuredGames = featuredGames;
        this.discounts = discounts;
    }

    browseGames() {
        this.gameList.forEach(game => console.log(game.title));
    }

    searchGame(title) {
        const game = this.gameList.find(game => game.title === title);
        if (game) {
            console.log(`The game "${game.title}" was found.`);
        } else {
            console.log(`The game "${title}" was not found.`);
        }
    }

    applyDiscount(game, percentage) {
        if (game instanceof Game) {
            game.price *= (1 - percentage / 100);
            console.log(`Discount applied! New price of "${game.title}": $${game.price.toFixed(2)}`);
        } else {
            console.log("Invalid Game object.");
        }
    }
}

module.exports = Store;
