const getInput = require("../utils/input");
const getRandomNumber = require("../utils/random");

async function battle(player, enemies) {
    console.log("Enemies appear!");

    while (player.health > 0 && enemies.some(enemy => enemy.currentHealth > 0)) {
        displayBattleStats(player, enemies);

        console.log("Choose an action:");
        console.log("1. Attack");
        console.log("2. Cast Spell");
        console.log("3. Use Potion");
        console.log("4. Use Mana Potion")
        if (player.attackCount >= 3) {
            console.log("5. Special Attack (Ready)");
        } else {
            console.log(`5. Special Attack (${player.attackCount}/3 charged)`);
        }

        const action = await getInput();

        if (action === "5" && player.attackCount < 3) {
            console.log(
                `${player.name}'s special attack is only ${player.attackCount}/3 charged.`
            );
            continue;
        }

        let chosenEnemy = null;

        if (action === "1" || action === "2" || action === "5") {
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
            const potionUsed = player.heal();
            if (!potionUsed) {
                continue;
            }
        } else if (action === "4") {
            const potionUsed = player.healMana();
            if (!potionUsed) {
                continue;
            }
        } else if (action === "5") {
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
    while (player.exp >= player.expToNextLevel) {
        player.exp -= player.expToNextLevel;
        player.level++;

        player.expToNextLevel = Math.floor(
            player.expToNextLevel * 1.5
        );

        player.health += 100;
        player.mana += 50;

        console.log(`${player.name} reached level ${player.level}!`);
        console.log(
            `Next level requires ${player.expToNextLevel} XP.`
        );
    }
}
function displayBattleStats (player, enemies) {
    console.log("===== BATTLE STATS =====");
    console.log(`${player.name} | HP: ${player.health} | Mana: ${player.mana} | Potions: ${player.potions} | Mana Potions: ${player.manaPotions} | XP: ${player.exp}/${player.expToNextLevel} | Gold: ${player.gold}`);
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
module.exports = battle;