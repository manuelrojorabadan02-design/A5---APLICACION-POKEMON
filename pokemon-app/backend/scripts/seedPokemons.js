const pool = require('../db');

async function seed() {
    try {
        console.log("Fetching 1000+ Pokemon from PokeAPI...");
        // Need at least 1000, going up to 1025
        for (let i = 1; i <= 1025; i++) {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                if (!response.ok) {
                    console.log(`Skipping ${i}, not found`);
                    continue;
                }
                const data = await response.json();
                const pokedex_number = data.id;
                const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);

                const type1 = data.types[0].type.name;
                const type2 = data.types.length > 1 ? data.types[1].type.name : null;

                let generation = 1;
                if (i > 151) generation = 2;
                if (i > 251) generation = 3;
                if (i > 386) generation = 4;
                if (i > 493) generation = 5;
                if (i > 649) generation = 6;
                if (i > 721) generation = 7;
                if (i > 809) generation = 8;
                if (i > 905) generation = 9;

                const stats = {};
                data.stats.forEach(s => {
                    stats[s.stat.name] = s.base_stat;
                });

                const query = `
                    INSERT INTO pokemon
                    (pokedex_number, name, type1, type2, generation, hp, attack, defense, sp_attack, sp_defense, speed)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE 
                    hp=VALUES(hp), attack=VALUES(attack), defense=VALUES(defense), 
                    sp_attack=VALUES(sp_attack), sp_defense=VALUES(sp_defense), speed=VALUES(speed);
                `;

                await pool.query(query, [
                    pokedex_number, name, type1, type2, generation,
                    stats['hp'] || 0,
                    stats['attack'] || 0,
                    stats['defense'] || 0,
                    stats['special-attack'] || 0,
                    stats['special-defense'] || 0,
                    stats['speed'] || 0
                ]);

                if (i % 100 === 0) {
                    console.log(`Inserted ${i} Pokemon...`);
                }
            } catch (err) {
                console.error(`Failed to fetch/insert Pokemon ${i}:`, err.message);
            }
        }
        console.log("Seeding complete!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seed();
