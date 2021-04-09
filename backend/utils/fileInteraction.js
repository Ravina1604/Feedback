const fs = require('fs');
const path = require('path');

//to get data from Json file
async function getJsonData(filePath) {
    try {
        const res = await fs.readFileSync(
            path.join(__dirname, filePath)
        ).toString();
        return JSON.parse(res);
    }
    catch (e) {
        console.log(e);
    }
}

//to write updated data in Json file 
async function writeJsonData(filePath, content) {
    try {
        await fs.writeFileSync(path.join(__dirname, filePath), JSON.stringify(content));
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    getJsonData,
    writeJsonData
}