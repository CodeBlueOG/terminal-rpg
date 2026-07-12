const player = require("./player");

const { areas } = require("./data/areas");

const storyEvents = require("./data/story");
const { playStory } = require("./systems/story");

const getInput = require("./utils/input");

const travel = require("./systems/travel");
const campMenu = require("./systems/camp");

const { saveGame, loadGame } = require("./systems/save");

async function startGame() {
    await playStory(storyEvents.openingBeforeName);

    console.log("What is your character's name?");
    const characterName = await getInput();

    player.name = characterName;

    await playStory(storyEvents.openingAfterName);

    console.log(
        `${player.name} | HP: ${player.health} | Mana: ${player.mana} | Level: ${player.level} | Exp: ${player.exp} | Gold: ${player.gold}`
    );

    await campMenu(player);
    await travel(player, areas);
}

async function mainMenu() {
    while (true) {
        console.log("\n==============================");
        console.log("Terminal RPG: The Last Light");
        console.log("==============================");
        console.log("1. New Game");
        console.log("2. Continue Game");
        console.log("3. Exit");

        const choice = await getInput();

        if (choice === "1") {
            await startGame();
            return;
        } else if (choice === "2") {
            const loadedPlayer = loadGame();

            if (loadedPlayer) {
                Object.assign(player, loadedPlayer);

                console.log(`\nWelcome back, ${player.name}.`);

                await campMenu(player);
                return;
            }
        } else if (choice === "3") {
            console.log("\nUntil the light calls again.");
            return;
        } else {
            console.log("\nInvalid choice.");
        }
    }
}

mainMenu();
//Testing