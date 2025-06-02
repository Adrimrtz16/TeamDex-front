export function getAbilities(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(pokemon => {
            const abilitiesURL = pokemon.abilities.map(a => a.ability.url);

            return Promise.all(
                abilitiesURL.map(url =>
                    fetch(url)
                        .then(res => res.json())
                        .then(data => ({
                            name: data.name,
                            description: data.flavor_text_entries.find(
                                entry => entry.language.name === 'en'
                            )?.flavor_text || ''
                        }))
                )
            );
        });
}
