import { useState, useEffect } from 'react';
import { getPokemonData } from '../services/getPokemonData';

const usePokemonData = (id) => {
    const [pokemonData, setPokemonData] = useState({});
    const [buscando, setBuscando] = useState(true);

    function obtenerPokemonData() {
        if (!id) return; // Evita llamadas con id undefined
        setBuscando(true);
        getPokemonData(id).then(datos => {
            setPokemonData(datos);
            setBuscando(false); 
        });
    }

    useEffect(obtenerPokemonData, [id]);

    return { pokemonData, buscando };
};

export default usePokemonData;