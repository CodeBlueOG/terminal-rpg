const player = require("./player");


const { areas } = require("./data/areas");

const storyEvents = require("./data/story");
const { playStory } = require("./systems/story");

const getInput = require("./utils/input");

const travel = require("./systems/travel");
const campMenu = require("./systems/camp");

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

startGame();