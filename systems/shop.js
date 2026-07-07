const shopItems = require("../data/shopItems");
const getInput = require("../utils/input");

async function shop(player) {
    while (true) {
        console.log("===== SHOP =====");
        console.log(`${player.name} has ${player.gold} gold.`);

        for (let i = 0; i < shopItems.length; i++) {
            const item = shopItems[i];

            if (item.type === "weapon") {
                console.log(`${i + 1}. ${item.name} - ${item.damage} damage - ${item.price} gold`);
            } else if (item.type === "spell") {
                console.log(`${i + 1}. ${item.name} - ${item.damage} damage, ${item.manaCost} mana - ${item.price} gold`);
            } else {
                console.log(`${i + 1}. ${item.name} - ${item.price} gold`);
            }
        }

        console.log("6. Leave Shop");

        const choice = await getInput();

        if (choice === "6") {
            console.log("You leave the shop.");
            return;
        }

        const itemIndex = Number(choice) - 1;
        const chosenItem = shopItems[itemIndex];

        if (!chosenItem) {
            console.log("Invalid choice.");
            continue;
        }

        if (player.gold < chosenItem.price) {
            console.log("Not enough gold.");
            continue;
        }

        player.gold -= chosenItem.price;

        if (chosenItem.type === "weapon") {
            player.inventory.push({
                name: chosenItem.name,
                damage: chosenItem.damage,
                type: "weapon"
            });

            console.log(`${player.name} bought ${chosenItem.name}!`);
        } else if (chosenItem.type === "spell") {
            player.spells.push({
                name: chosenItem.name,
                damage: chosenItem.damage,
                manaCost: chosenItem.manaCost
            });

            console.log(`${player.name} learned ${chosenItem.name}!`);
        } else if (chosenItem.type === "potion") {
            player.potions++;
            console.log(`${player.name} bought a Health Potion!`);
        } else if (chosenItem.type === "manaPotion") {
            player.mana += chosenItem.manaAmount;
            console.log(`${player.name} restored ${chosenItem.manaAmount} mana!`);
        }
    }
}
module.exports = shop;