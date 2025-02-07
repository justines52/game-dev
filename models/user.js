const Game = require('./Game');

class User {
    constructor(username, email, password, balance, ownedGames = []) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.balance = balance;
        this.ownedGames = ownedGames || [];
        this.banned = false;
    }

    isBanned() {
        return this.banned;
    }

    purchaseGame(game) {
        if (!(game instanceof Game)) {
            return {success: false, message: "Invalid game object."};
        }

        if (this.isBanned()) {
            return {success: false, message: "You are banned and cannot purchase games."};
        }

        if (this.ownedGames.some(g => g.title === game.title)) {
            return {success: false, message: `You already own "${game.title}".`};
        }

        if (this.balance >= game.price) {
            this.balance -= game.price;
            this.ownedGames.push(game);
            return {success: true, message: `Successfully purchased "${game.title}"!`};
        } else {
            return {success: false, message: `Not enough balance to buy "${game.title}".`};
        }
    }

    downloadGame(game) {
        if (!(game instanceof Game)) {
            return {success: false, message: "Invalid game object."};
        }

        if (this.isBanned()) {
            return {success: false, message: "You are banned and cannot download games."};
        }

        if (!this.ownedGames.some(g => g.title === game.title)) {
            return {success: false, message: `You need to purchase "${game.title}" before downloading it.`};
        }

        console.log(`Starting download for "${game.title}"...`);
        game.download();
        return {success: true, message: `Download started for "${game.title}".`};
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