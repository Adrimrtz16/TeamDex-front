import { useState, useEffect } from 'react';
import { getPokemons } from '../services/getPokemons';
import { getPokemonSV } from '../services/getPokemonSV';

const usePokemons = () => {
    const [pokemons, setPokemons] = useState([]);
    const [buscando, setBuscando] = useState(true);

    function obtenerPokemons() {
        setBuscando(true);

        getPokemonSV()
            .then(({ speciesSV }) => {
                // Crear un array de promesas para obtener todos los Pokémon
                const promises = speciesSV.map((pokeId) => getPokemons({ id: pokeId }));

                // Esperar a que todas las promesas se resuelvan
                return Promise.all(promises);
            })
            .then((datos) => {
                // Ordenar los datos por ID antes de establecer el estado
                const sortedPokemons = datos.sort((a, b) => a.id - b.id);
                setPokemons(sortedPokemons);
            })
            .finally(() => {
                setBuscando(false);
            });
    }

    useEffect(obtenerPokemons, []);

    return { pokemons, buscando };
};

export default usePokemons;