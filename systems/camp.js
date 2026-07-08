const getInput = require("../utils/input");
const shop = require("./shop");
const displayInventory = require("./inventory");

async function campMenu(player) {
    let atCamp = true;

    while (atCamp) {
        console.log("\n======================");
        console.log("🔥 The Last Campfire");
        console.log("======================");
        console.log("1. Rest");
        console.log("2. View Stats");
        console.log("3. Inventory");

        if (player.camp?.merchantUnlocked) {
            console.log("4. Merchant");
        } else {
            console.log("4. Merchant (Locked)");
        }

        console.log("5. Continue Adventure");

        const choice = await getInput();

        if (choice === "1") {
            player.health = player.maxHealth;
            player.mana = player.maxMana;
            console.log("\nYou rest by the fire.");
            console.log("HP and Mana restored.");
        } else if (choice === "2") {
            console.log(
                `\n${player.name} | HP: ${player.health}/${player.maxHealth} | Mana: ${player.mana}/${player.maxMana} | Level: ${player.level} | Exp: ${player.exp} | Gold: ${player.gold}`
            );
        } else if (choice === "3") {
            displayInventory(player);

        } else if (choice === "4") {
            if (player.camp?.merchantUnlocked) {
                await shop(player);
            } else {
                console.log("\nNo merchant has arrived at camp yet.");
            }
        } else if (choice === "5") {
            atCamp = false;
        } else {
            console.log("\nInvalid choice.");
        }
    }
}

module.exports = campMenu;