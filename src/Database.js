const fs = require('fs');
const ForwardElementLength = 10;



module.exports = class Database {
    constructor(filePath, onload) {
        this.filePath = filePath;
        this.load(onload);

    }
    load(callback) {
        const parent = this;
        fs.readFile(this.filePath, 'utf8', (err, data) => {
            if (err) {

            }
            if (data == null || data.length == 0) {
                data = `{}`;
            }
            parent.jsonData = JSON.parse(data);


            if (callback != null)
                callback(this.jsonData);
            else
                console.log("Callback Empty: Database.js: load");
        });
    }
    saveData() {
        const data = JSON.stringify(this.jsonData);

        fs.writeFile(this.filePath, data, 'utf8', (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });

    }
    add(name, hashedData) {
        hashedData.forEach((element, i) => {
            if (i < ForwardElementLength / 2)
                return;
            this.jsonData[element] = { name: name };

        });
        /* for (let i = 0; i < hashedData.length - ForwardElementLength; i++) {
             let currentNode = this.jsonData;
 
             for (let j = 0; j < ForwardElementLength; j++) {
                 if (currentNode[hashedData[i + j] + "a"] == null) {
                     currentNode[hashedData[i + j] + "a"] = {};
                 }
                 currentNode = currentNode[hashedData[i + j] + "a"];
 
 
             }
             currentNode.name = name;
             console.log(this.jsonData);
             console.log(JSON.stringify(this.jsonData))
 
 
         }*/

    }
    find(hashedData) {
        return this.jsonData[hashedData];
    }
}