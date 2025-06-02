export function getPokemons({id}) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(pokemon => {
          return {
              id: pokemon.id,
              name: pokemon.name,
              tipos: pokemon.types.map(
                  ({ type: { url } }) =>
                    Number(url.split('/').slice(-2, -1)[0])
              ),
              abilities: pokemon.abilities.map(a => a.ability.name),
              stats:  pokemon.stats.map(s => s.base_stat),
          } 
      });
}