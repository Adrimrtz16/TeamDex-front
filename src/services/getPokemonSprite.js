export function getPokemonSprite(name) {

    const formattedName = name
        .toLowerCase()
        .replace(/[\s_]+/g, "-")
        .replace(/-f$/, "-female")
        .replace(/-m$/, "-male")
        .replace(/^landorus$/, "landorus-incarnate")
        .replace(/^tornadus$/, "tornadus-incarnate")
        .replace(/^thundurus$/, "thundurus-incarnate")
        .replace(/^enamorus$/, "enamorus-incarnate")
        .replace(/^urshifu$/, "urshifu-single-strike") 

    return fetch(`https://pokeapi.co/api/v2/pokemon/${formattedName}`)
        .then(response => {
            if (!response.ok) throw new Error("Not found");
            return response.json();
        })
        .then(pokemon => pokemon.sprites?.front_default || null)
        .catch(() => null); // Devuelve null si hay error
}