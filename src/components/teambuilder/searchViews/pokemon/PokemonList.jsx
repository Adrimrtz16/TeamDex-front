import React, { useMemo } from "react";
import Pokemon from "./Pokemon";
import Loader from "../../../loader/Loader";

const PokemonList = React.memo(({ nameFilter, pokemons, buscando, setPokemonSeleccionadoId, setTeam, actualPokemon, setSearch, setNameFilter }) => {
  const filteredPokemons = useMemo(() => {
    const exclude = [
      "totem",
      "mode",
      "build",
      "starter",
      "gulping",
      "gorging",
      "minior-orange",
      "minior-yellow",
      "minior-green",
      "minior-blue",
      "minior-indigo",
      "minior-violet"
    ];

    let result = pokemons;

    if (nameFilter) {
      const f = nameFilter.toLowerCase();
      result = result.filter(p => p.name.includes(f));
    }

    result = result.filter(p => p.name !== "zygarde-10");
    result = result.filter(p =>
      exclude.every(substr => !p.name.includes(substr))
    );

    return result;
  }, [pokemons, nameFilter]);

  return (
    <div className="row">
      {buscando ? (
        <div className="col-md-12">
          <Loader />
        </div>
      ) : (
        filteredPokemons.map(pokemon => (
          <Pokemon
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            sprite={pokemon.sprite}
            tipos={pokemon.tipos}
            stats={pokemon.stats}
            abilities={pokemon.abilities}
            setPokemonSeleccionadoId={setPokemonSeleccionadoId}
            setTeam={setTeam}
            actualPokemon={actualPokemon}
            setSearch={setSearch}
            setNameFilter={setNameFilter}
          />
        ))
      )}
    </div>
  );
});

export default PokemonList;