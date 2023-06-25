const Identifier = require("./Identifier");
const MP3 = require('./MP3');
const Database = require("./Database");

var db;
function start() {
    const printInfo = true;
    const addingData = false;
    const samplesFolder = "samples/";

    db = new Database("db.json", async (dbx) => {

        if (addingData) {

            addSong(samplesFolder + "3.mp3", '3', db)
            addSong(samplesFolder + "2.mp3", '2', db)
            addSong(samplesFolder + "1.mp3", '1', db)
            addSong(samplesFolder + "4.mp3", '4', db)


        }
        else {
            Identifier.benchmark(async () => {
                await find(samplesFolder + "x.mp3", db, printInfo)
                await find(samplesFolder + "y.mp3", db, printInfo)


            })


        }
    })



}


//ADD MP3 TO DATABASE

async function addSong(mp3Path, name, db) {
    return new Promise((reslove, reject) => {
        const mp3 =
            new MP3(mp3Path, async (fa) => {
                const identifier = new Identifier(fa, name);
                identifier.process();
                await identifier.addToDatabase(db);
                reslove();
            });
    })

}
async function find(mp3Path, db, printInfo) {
    return new Promise((reslove) => {
        const mp3 =
            new MP3(mp3Path, (fa) => {
                const identifier2 = new Identifier(fa, "c");
                Identifier.benchmark(() => {
                    identifier2.process();
                    if (printInfo) {
                        console.log("PreProcessed2: ", identifier2.preProcessedArray);
                        console.log("Hashed2:", identifier2.hashedData);
                    }
                    const song = identifier2.searchFromDatabase(db);
                    reslove(song);
                });





            });
    })


}
start();
