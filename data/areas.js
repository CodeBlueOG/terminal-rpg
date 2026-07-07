const areas = [
    {
        name: "Lost Forest",
        minEnemies: 1,
        maxEnemies: 3,
        requiredLevel: 1,
        possibleEnemies: ["Goblin", "Skeleton", "Orc"],
    },
    {
        name: "Castle of the Night Walkers",
        minEnemies: 1,
        maxEnemies: 3,
        requiredLevel: 3,
        possibleEnemies: ["Vampire Spawn", "Vampire Captain"],
    },
    {
        name: "Mountain",
        minEnemies: 1,
        maxEnemies: 3,
        requiredLevel: 5,
        possibleEnemies: ["Orc", "Dragon Rider"],
    },
    {
        name: "Dark Realm",
        minEnemies: 1,
        maxEnemies: 3,
        possibleEnemies:  ["Dark Cultist", "Vampire Captain"],
        requiredLevel: 7
    }
];
const bossArea = [
    {
        name: "Mountain Peak",
        minEnemies: 1,
        maxEnemies: 1,
        requiredLevel: 6,
        possibleEnemies: ["Vulkan the Fire Dragon of Old"]
    },
    {
        name: "Dark Realm Throne",
        minEnemies: 1,
        maxEnemies: 1,
        requiredLevel: 8,
        possibleEnemies: ["Dark Lord Varian"]
    }
];
module.exports = {
    areas,
    bossArea
};