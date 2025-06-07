import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import Loader from "../../../loader/Loader";

const PokemonList = ({nameFilter , pokemons , buscando , setPokemonSeleccionadoId, setTeam, actualPokemon, setSearch, setNameFilter}) => {

    const [filteredPokemons, setFilteredPokemons] = useState([]);

    function mostrarPokemons() {
        const exclude = [
            'totem',
            'mode',
            'build',
            'starter',
            'gulping',
            'gorging',
            'minior-orange',
            'minior-yellow',
            'minior-green',
            'minior-blue',
            'minior-indigo',
            'minior-violet'
        ];
          
        let result = pokemons;

        if(nameFilter && nameFilter !== ""){
            result = result.filter(pokemon => pokemon.name.includes(nameFilter));
        }

        
        result = result.filter(pokemon => pokemon.name !== 'zygarde-10');

        result = result.filter(pokemon =>
            exclude.every(substr => !pokemon.name.includes(substr))
        );

        setFilteredPokemons(result);
    };

    useEffect(mostrarPokemons, [pokemons, nameFilter]);

    return (
        <div className="row">
            { buscando ? 
                <div className="col-12">
                    <Loader/>
                </div> : 
                filteredPokemons.map((pokemon) => (
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
            }
        </div>
    );
}

export default PokemonList;