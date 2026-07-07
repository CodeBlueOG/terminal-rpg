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

module.exports = enemyTypes;