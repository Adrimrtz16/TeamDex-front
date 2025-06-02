export function getPokemonData(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(pokemon => {
            return {
                name: pokemon.name,
                sprite: pokemon.sprites.front_default,
                spriteShiny: pokemon.sprites.front_shiny,
                tipos: pokemon.types.map(
                    ({ type: { url } }) =>
                      Number(url.split('/').slice(-2, -1)[0])
                ),
                abilities: pokemon.abilities.map( a => a.ability.name),
                stats:  pokemon.stats.map(s => s.base_stat),
                id: pokemon.id,
            } 
        });
}
