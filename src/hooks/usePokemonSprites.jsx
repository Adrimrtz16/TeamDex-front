import { useState, useEffect } from 'react';
import { getPokemonSprite } from '../services/getPokemonSprite';

const usePokemonSprites = (pokemon) => {
    const [sprites, setSprites] = useState();
    
    function obtenerPokemonSprites() {
        
        getPokemonSprite(pokemon).then(data => {
            setSprites(data.sprite); 
        });

    }

    useEffect(obtenerPokemonSprites, []);

    return { sprites };
};

export default usePokemonSprites;