const fs = require("fs");

const SAVE_FILE = "./saveData.json";

function saveGame(player) {
    const saveData = {
        player
    };

    fs.writeFileSync(SAVE_FILE, JSON.stringify(saveData, null, 4));

    console.log("\nGame saved successfully.");
}

function loadGame() {
    if (!fs.existsSync(SAVE_FILE)) {
        console.log("\nNo save file found.");
        return null;
    }

    const data = fs.readFileSync(SAVE_FILE, "utf-8");
    const saveData = JSON.parse(data);

    console.log("\nSave file loaded.");
    return saveData.player;
}

module.exports = {
    saveGame,
    loadGame
};