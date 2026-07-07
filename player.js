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
module.exports = player;