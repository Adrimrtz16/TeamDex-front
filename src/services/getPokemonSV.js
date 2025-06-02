export function getPokemonSV() {
  return fetch('https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0')
    .then(response => response.json())
    .then(data => {
      const speciesSV = [];
      const requests = data.results.map(poke =>
        fetch(poke.url)
          .then(res => res.json())
          .then(pokeData => {
            if (
              Array.isArray(pokeData.moves) &&
              pokeData.moves.some(move =>
                move.version_group_details.some(
                  detail => detail.version_group.name === 'scarlet-violet'
                )
              )
            ) {
              speciesSV.push(pokeData.id);
            }
          })
      );

      // Aquí esperamos a todas las peticiones y luego ordenamos
      return Promise.all(requests).then(() => {
        speciesSV.sort((a, b) => a - b); 
        return { speciesSV };
      });
    });
}
