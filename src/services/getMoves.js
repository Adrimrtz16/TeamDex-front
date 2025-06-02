export function getMoves(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(pokemon => {
            // Filtrar los movimientos para la versión Scarlet y Violet
            const movesSV = pokemon.moves.filter(m =>
                m.version_group_details.some(
                    vgd => vgd.version_group.name === "scarlet-violet"
                )
            );
            const movesURL = movesSV.map(m => m.move.url);

            return Promise.all(
                movesURL.map(url =>
                    fetch(url)
                        .then(res => res.json())
                        .then(data => ({
                            name: data.name,
                            accuracy: data.accuracy || "-",
                            power: data.power || "-",
                            pp: data.pp || "-",
                            typeId: data.type.url
                                ? Number(data.type.url.match(/\/type\/(\d+)\//)?.[1])
                                : null,
                            category: data.damage_class.name,
                            priority: data.priority || "0",
                            description: data.flavor_text_entries.find(
                                entry => entry.language.name === 'en'
                            )?.flavor_text || ''
                        }))
                )
            );
        });
}
