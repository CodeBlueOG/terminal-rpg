const enemyTypes = require("../data/enemies");

const getInput = require("../utils/input");
const getRandomNumber = require("../utils/random");

const shop = require("./shop");
const battle = require("./battle");

const storyEvents = require("../data/story");
const { playStoryOnce } = require("./story");

function generateEnemies(area) {
    const enemyCount = getRandomNumber(area.minEnemies, area.maxEnemies);
    const enemies = [];

    for (let i = 0; i < enemyCount; i++) {
        const randomEnemyName = area.possibleEnemies[
            getRandomNumber(0, area.possibleEnemies.length - 1)
        ];

        const enemyTemplate = enemyTypes.find(enemy => enemy.name === randomEnemyName);

        enemies.push({
            ...enemyTemplate,
            currentHealth: enemyTemplate.maxHealth
        });
    }

    return enemies;
};

async function travel(player, areas) {
    while (player.health > 0) {
        const unlockedAreas = areas.filter(
            area => player.level >= area.requiredLevel
        );

        console.log("Where would you like to go?");

        for (let i = 0; i < unlockedAreas.length; i++) {
            const area = unlockedAreas[i];

            console.log(
                `${i + 1}. ${area.name} - Level ${area.requiredLevel}`
            );
        }

        const shopOption = unlockedAreas.length + 1;
        const quitOption = unlockedAreas.length + 2;

        console.log(`${shopOption}. Shop`);
        console.log(`${quitOption}. Quit Game`);

        const choice = Number(await getInput());

        if (choice === shopOption) {
            await shop(player);
            continue;
        }

        if (choice === quitOption) {
            console.log("Thanks for playing!");
            return;
        }

        const areaIndex = choice - 1;
        const chosenArea = unlockedAreas[areaIndex];

        if (!chosenArea) {
            console.log("Invalid choice.");
            continue;
        }

        console.log(`${player.name} enters ${chosenArea.name}.`);

        if (chosenArea.name === "Lost Forest") {
            await playStoryOnce("lostForest", storyEvents.lostForest);
        }

        const enemies = generateEnemies(chosenArea);

        await battle(player, enemies);
            if (
            player.health > 0 &&
            chosenArea.name === "Lost Forest" &&
            player.hasUsedLightBeam
            ) {
                await playStoryOnce(
                "dawnshardDiscovery",
                storyEvents.dawnshardDiscovery
                );
            }
    }
}
module.exports = travel;