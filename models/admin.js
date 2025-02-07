const User = require('./User');
const Game = require('./Game');

class Admin {
    constructor(adminID, permissions = []) {
        this.adminID = adminID;
        this.permissions = permissions;
    }

    banUser(user) {
        if (user instanceof User) {
            user.banned = true;
            console.log(`The user "${user.username}" is banned.`);
        } else {
            console.log("Invalid user.");
        }
    }

    unbanUser(user) {
        if (user instanceof User && user.banned) {
            user.banned = false;
            console.log(`The user "${user.username}" is unbanned.`);
        } else {
            console.log("User is not banned or invalid.");
        }
    }

    removeGame(game, store) {
        if (!(game instanceof Game)) {
            console.log("Invalid game.");
            return;
        }

        store.gameList = store.gameList.filter(g => g.title !== game.title);
        console.log(`The game "${game.title}" has been deleted.`);
    }
}

module.exports = Admin;