
// User.js
const Game = require('./Game');

class User {
    constructor(username, email, password, balance, ownedGames = []) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.balance = balance;
        this.ownedGames = ownedGames;
        this.banned = false;
    }

    isBanned() {
        return this.banned;
    }

    purchaseGame(game) {
        if (!(game instanceof Game)) {
            console.log("Invalid game object.");
            return;
        }

        if (this.isBanned()) {
            console.log("You are banned and cannot purchase games.");
            return;
        }

        if (this.ownedGames.some(g => g.title === game.title)) {
            console.log(`You already own "${game.title}".`);
            return;
        }

        if (this.balance >= game.price) {
            this.balance -= game.price;
            this.ownedGames.push(game);
            console.log(`Successfully purchased "${game.title}"!`);
        } else {
            console.log(`Not enough balance to buy "${game.title}".`);
        }
    }

    downloadGame(game) {
        if (!(game instanceof Game)) {
            console.log("Invalid game object.");
            return;
        }

        if (this.isBanned()) {
            console.log("You are banned and cannot download games.");
            return;
        }

        if (!this.ownedGames.some(g => g.title === game.title)) {
            console.log(`You need to purchase "${game.title}" before downloading it.`);
            return;
        }

        console.log(`Starting download for "${game.title}"...`);
        game.download();
    }

    updateProfile(details) {
        const allowedFields = ["username", "email", "password"];

        for (const field in details) {
            if (field === "password") {
                this.updatePassword(details.oldPassword, details.newPassword);
            } else if (allowedFields.includes(field)) {
                this[field] = details[field];
            } else {
                console.log(`Invalid field: ${field}. Skipping...`);
            }
        }

        console.log("Profile updated successfully!");
    }

    updatePassword(oldPassword, newPassword) {
        if (this.password !== oldPassword) {
            console.log("Incorrect old password. Password not updated.");
            return;
        }

        this.password = newPassword;
        console.log("Password updated successfully!");
    }
}

module.exports = User;
