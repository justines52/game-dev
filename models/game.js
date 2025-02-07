// Game.js
class Game {
    constructor(title, developer, price, downloads, rating, description, files = []) {
        this.title = title;
        this.developer = developer;
        this.price = price;
        this.downloads = downloads;
        this.rating = rating;
        this.description = description;
        this.files = files;
    }

    download() {
        if (this.price !== 0) {
            this.purchase();
        } else {
            this.startDownload();
        }
    }

    purchase() {
        console.log(`Purchasing ${this.title}...`);
        this.startDownload();
    }

    startDownload() {
        if (this.files.length > 0) {
            console.log(`Downloading ${this.title}...`);
        } else {
            console.log(`No files available to download for ${this.title}.`);
        }
    }

    delete() {
        this.files = [];
        console.log(`Deleted ${this.title}.`);
    }

    addFile(file) {
        this.files.push(file);
    }
}

module.exports = Game;
