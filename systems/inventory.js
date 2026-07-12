function viewInventory(player) {
    console.log("\nInventory:");

    console.log("\nWeapons:");
    player.inventory.forEach((weapon, index) => {
        console.log(`${index + 1}. ${weapon.name} - ${weapon.damage} damage`);
    });

    console.log(`\nHealth Potions: ${player.potions}`);
    console.log(`Mana Potions: ${player.manaPotions}`);
}

module.exports = {
    viewInventory
};