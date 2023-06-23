const Preprocessor = require("./Preprocessor");
const Hasher = require("./Hasher")
const Database = require("./Database");
const ForwardElementLength = 10;


module.exports = class Identifier {
    constructor(songFrequencyArray, name) {
        this.songFrequencyArray = songFrequencyArray;
        this.name = name;
    }
    process() {
        this.preProcessedArray = Preprocessor.process(this.songFrequencyArray);
        if (this.preProcessedArray.length < ForwardElementLength) {
            console.log("Warning: USABLE Song Data is insuffecient for sampling")
        }
        this.hashedData = Hasher.hash(this.preProcessedArray);


    }
    async addToDatabase(db) {
        return new Promise((reslove, reject) => {
            db.add(this.name, this.hashedData);
            db.saveData();
            reslove();
        })


    }
    searchFromDatabase(db) {
        let r;
        for (let i = 0; i < this.hashedData.length && r == undefined; i++) {
            r = db.find(this.hashedData[i]);

        }

        console.log("Song Name: ", r);
        return r;
    }
    static async benchmark(call) {
        const d = new Date().getTime();
        await call();
        console.log("Time taken:", new Date().getTime() - d);

    }

}