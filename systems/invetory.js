function displayInventory(player) {
    console.log("\nInventory:");

    console.log("\nWeapons:");
    player.inventory.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - Damage: ${item.damage}`);
    });

    console.log("\nSpells:");
    player.spells.forEach((spell, index) => {
        console.log(
            `${index + 1}. ${spell.name} - Damage: ${spell.damage} | Mana Cost: ${spell.manaCost}`
        );
    });

    console.log("\nConsumables:");
    console.log(`Health Potions: ${player.potions}`);
    console.log(`Mana Potions: ${player.manaPotions}`);
}

module.exports = displayInventory;