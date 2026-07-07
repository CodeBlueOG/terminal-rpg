async function getInput() {
   const rL = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rL.question('> ', answer => {
            rL.close();
            resolve(answer);
        });
    });
}
const player = {
    name: "Hero",
    health: 100,
    mana: 75,
    level: 1,
    exp: 0,
    gold: 0,
    attackCount: 0,
    potions: 3,
    inventory: [
    { name: "Sword", damage: 15, type: "weapon" },
    { name: "Bow", damage: 10, type: "weapon" },
    { name: "GreatSword", damage: 30, type: "weapon" }
],
    spells: [
        { name: "Fireball", damage: 25, manaCost: 10 },
        { name: "Ice Spear", damage: 20, manaCost: 8 },
        { name: "Lightning Bolt", damage: 35, manaCost: 15 }
    ],
    attack: function(enemies, weapon) {
        console.log(`${this.name} attacks ${enemies.name} with the ${weapon.name}!`);
        enemies.currentHealth -= weapon.damage;
        if (enemies.currentHealth < 0) {
            enemies.currentHealth = 0;
        }
        console.log(`${enemies.name} now has ${enemies.currentHealth}/${enemies.maxHealth} HP.`);
    },
    castSpell: function(enemy, spell) {
    if (this.mana >= spell.manaCost) {
        console.log(`${this.name} casts ${spell.name} on ${enemy.name}!`);

        enemy.currentHealth -= spell.damage;

        if (enemy.currentHealth < 0) {
            enemy.currentHealth = 0;
        }

        this.mana -= spell.manaCost;

        console.log(`${enemy.name} now has ${enemy.currentHealth}/${enemy.maxHealth} HP.`);
        console.log(`${this.name} now has ${this.mana} mana.`);
    } else {
        console.log(`${this.name} does not have enough mana!`);
    }
},
    specialAttack: function(enemies) {
        if (this.attackCount >= 3) {
            console.log(`${this.name} uses a special attack on ${enemies.name}!`);
            console.log(`${this.name} uses charged light beam on ${enemies.name}!`);
            enemies.currentHealth -= 100;
            if (enemies.currentHealth < 0) {
                enemies.currentHealth = 0;
            }
            this.attackCount = 0;
            console.log(`${enemies.name} now has ${enemies.currentHealth}/${enemies.maxHealth} HP.`);
        } else {
            console.log(`${this.name}'s special attack is not charged yet`);
        }
    },
    heal: function() {
        if (this.potions > 0) {
            console.log(`${this.name} uses a potion to heal!`);
            this.health += 50;
            this.potions--;
            console.log(`${this.name} now has ${this.health} health and ${this.potions} potions left.`);
        } else {
            console.log(`${this.name} has no potions left!`);
        }
    }
};
const shopItems = [
    { name: "Iron Sword", type: "weapon", damage: 25, price: 50 },
    { name: "War Bow", type: "weapon", damage: 22, price: 60 },
    { name: "Health Potion", type: "potion", healAmount: 50, price: 25 },
    { name: "Mana Potion", type: "manaPotion", manaAmount: 30, price: 25 },
    { name: "Fire Blast", type: "spell", damage: 45, manaCost: 25, price: 100 }
];
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

const enemyTypes = [
    {
        name: "Goblin",
        maxHealth: 40,
        exp: 15,
        gold: 8,
        attacks: [
            { name: "Stab", damage: 8 },
            { name: "Rock Throw", damage: 5 }
        ]
    },
    {
        name: "Skeleton",
        maxHealth: 60,
        exp: 25,
        gold: 12,
        attacks: [
            { name: "Bone Slash", damage: 10 },
            { name: "Rattle Strike", damage: 14 }
        ]
    },
    {
        name: "Orc",
        maxHealth: 80,
        exp: 40,
        gold: 20,
        attacks: [
            { name: "Axe Swing", damage: 18 },
            { name: "Headbutt", damage: 12 }
        ]
    },
    {
        name: "Vampire Spawn",
        maxHealth: 100,
        exp: 60,
        gold: 30,
        attacks: [
            {name: "Bite", damage: 20},
            {name: "Screech", damage: 10}
        ]
    },
    {
        name: "Vampire Captain",
        maxHealth: 150,
        exp: 80,
        gold: 50,
        attacks: [
            {name: "Captain's Bite", damage: 30},
            {name: "Frenzied Slash", damage: 25}
        ]
    },
    {
        name: "Dragon Rider",
        maxHealth: 100,
        exp: 100,
        gold: 50,
        attacks: [
            {name: "Fireball", damage: 50},
            {name: "Piercing Strike", damage: 35}
        ]
    },
    {
        name: "Vulkan the Fire Dragon of Old",
        maxHealth: 350,
        exp: 250,
        gold: 100,
        attacks: [
            {name: "Firebreath", damage: 75},
            {name: "Tail Swipe", damage: 50}
        ]
    },
    {
        name: "Dark Cultist",
        maxHealth: 150,
        exp: 100,
        gold: 75,
        attacks: [
            {name: "Dark Pulse", damage: 40},
            {name: "Psionic Resonance", damage: 25}
        ]
    },
    {
        name: "Dark Lord Varian",
        maxHealth: 400,
        exp: 300,
        gold: 250,
        attacks: [
            {name: "Dark Wave", damage: 75},
            {name: "Psionic Break", damage: 50}
        ]
    }
];

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
        requiredLevel: 2,
        possibleEnemies: ["Vampire Spawn", "Vampire Captain"],
    },
    {
        name: "Mountain",
        minEnemies: 1,
        maxEnemies: 3,
        requiredLevel: 3,
        possibleEnemies: ["Orc", "Dragon Rider"],
    },
    {
        name: "Dark Realm",
        minEnemies: 1,
        maxEnemies: 3,
        possibleEnemies:  ["Dark Cultist", "Vampire Captain"],
        requiredLevel: 5
    }
];
const bossArea = [
    {
        name: "Mountain Peak",
        minEnemies: 1,
        maxEnemies: 1,
        requiredLevel: 4,
        possibleEnemies: ["Vulkan the Fire Dragon of Old"]
    },
    {
        name: "Dark Realm Throne",
        minEnemies: 1,
        maxEnemies: 1,
        requiredLevel: 6,
        possibleEnemies: ["Dark Lord Varian"]
    }
];

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max-min +1)) + min;
};
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

async function startGame() {
    console.log("What is your character's name?");

    const characterName = await getInput();

    player.name = characterName;

console.log(
    `${player.name} | HP: ${player.health} | Mana: ${player.mana} | Level: ${player.level} | Exp: ${player.exp} | Gold: ${player.gold}`
);
    await travel(player, areas);
}

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

        const enemies = generateEnemies(chosenArea);

        await battle(player, enemies);
    }
}
startGame();
async function battle(player, enemies) {
    console.log("Enemies appear!");

    while (player.health > 0 && enemies.some(enemy => enemy.currentHealth > 0)) {
        displayBattleStats(player, enemies);

        console.log("Choose an action:");
        console.log("1. Attack");
        console.log("2. Cast Spell");
        console.log("3. Use Potion");
        if (player.attackCount >= 3) {
            console.log("4. Special Attack (Ready)");
        } else {
            console.log(`4. Special Attack (${player.attackCount}/3 charged)`);
        }

        const action = await getInput();

        if (action === "4" && player.attackCount < 3) {
            console.log(
                `${player.name}'s special attack is only ${player.attackCount}/3 charged.`
            );
            continue;
        }

        let chosenEnemy = null;

        if (action === "1" || action === "2" || action === "4") {
            chosenEnemy = await chooseEnemy(enemies);

            if (!chosenEnemy) {
                continue;
            }
        }

        if (action === "1") {
            const chosenWeapon = await chooseWeapon(player);

            if (!chosenWeapon) {
                continue;
            }
            player.attack(chosenEnemy, chosenWeapon);
            player.attackCount++;
            isEnemyDefeated(player, chosenEnemy);
        
        } else if (action === "2") {
            console.log("Choose a spell:");

            for (let i = 0; i < player.spells.length; i++) {
                const spell = player.spells[i];
                console.log(`${i + 1}. ${spell.name} (${spell.damage} damage, ${spell.manaCost} mana)`);
            }

            const spellChoice = await getInput();
            const spellIndex = Number(spellChoice) - 1;
            const chosenSpell = player.spells[spellIndex];

            if (chosenSpell) {
                player.castSpell(chosenEnemy, chosenSpell);
                isEnemyDefeated(player, chosenEnemy);
            } else {
                 console.log("Invalid spell choice. You lose your turn.");
            };
        } else if (action === "3") {
            player.heal();
        } else if (action === "4") {
            player.specialAttack(chosenEnemy);
            isEnemyDefeated(player, chosenEnemy);
        } else {
            console.log("Invalid action. You lose your turn.");
        }
        

        const livingEnemies = enemies.filter(enemy => enemy.currentHealth > 0);

        if (livingEnemies.length > 0) {
            const randomEnemy = livingEnemies[getRandomNumber(0, livingEnemies.length - 1)];
            enemyAttack(player, randomEnemy);
        }
    }

    if (player.health <= 0) {
        console.log(`${player.name} has been defeated! Game Over.`);
        return;
    }

    console.log(`${player.name} has defeated all enemies!`);
}

function enemyAttack(player, enemy) {
    const randomIndex = getRandomNumber(0, enemy.attacks.length - 1);
    const chosenAttack = enemy.attacks[randomIndex];

    console.log(`${enemy.name} uses ${chosenAttack.name} on ${player.name}!`);

    player.health -= chosenAttack.damage;

    if (player.health < 0) {
        player.health = 0;
    }

    console.log(`${player.name} now has ${player.health} health.`);
}
function isEnemyDefeated(player, enemy) {
    if (enemy.currentHealth <= 0) {
        console.log(`${enemy.name} has been defeated!`);
        player.exp += enemy.exp;
        player.gold += enemy.gold;

        console.log(`${player.name} gained ${enemy.exp} XP and ${enemy.gold} gold.`);

        levelUp(player);
        return true;
    }

    return false;
}
function levelUp(player) {
    while (player.exp >= 100) {
        player.exp -= 100;
        player.level++;
        player.health += 100;
        player.mana += 50;
        console.log(`${player.name} reached ${player.level}`);
    }
}
function displayBattleStats (player, enemies) {
    console.log("===== BATTLE STATS =====");
    console.log(`${player.name} | HP: ${player.health} | Mana: ${player.mana} | Potions: ${player.potions} | Exp: ${player.exp} | Gold: ${player.gold}`);
    console.log("------------------------");

        const livingEnemies = enemies.filter(
            enemy => enemy.currentHealth > 0
        );

        for (let i = 0; i < livingEnemies.length; i++) {
            const enemy = livingEnemies[i];

            console.log(
                `${i + 1}. ${enemy.name} (${enemy.currentHealth}/${enemy.maxHealth} HP)`
            );
        }
    }
async function chooseEnemy(enemies) {
    const livingEnemies = enemies.filter(
        enemy => enemy.currentHealth > 0
    );

    if (livingEnemies.length === 1) {
        console.log(`Targeting ${livingEnemies[0].name}.`);
        return livingEnemies[0];
    }

    console.log("Choose an enemy:");

    const enemyChoice = await getInput();
    const enemyIndex = Number(enemyChoice) - 1;
    const chosenEnemy = livingEnemies[enemyIndex];

    if (!chosenEnemy || chosenEnemy.currentHealth <= 0) {
        console.log("Invalid enemy choice. You lose your turn.");
        return null;
    }

    return chosenEnemy;
}

async function chooseWeapon(player) {
    console.log("Choose a weapon:");

    for (let i = 0; i < player.inventory.length; i++) {
        const weapon = player.inventory[i];
        console.log(`${i + 1}. ${weapon.name} (${weapon.damage} damage)`);
    }

    const weaponChoice = await getInput();
    const weaponIndex = Number(weaponChoice) - 1;
    const chosenWeapon = player.inventory[weaponIndex];

    if (!chosenWeapon) {
        console.log("Invalid weapon choice. You lose your turn.");
        return null;
    }

    return chosenWeapon;
}