import { useState, useEffect } from 'react';
import { getMoves } from '../services/getMoves';

const useMoves = (id) => {
    const [moves, setMoves] = useState();
    const [buscandoMoves, setBbuscandoMoves] = useState(true);
    
    function obtenerMoves() {
        if (!id) return;
        setBbuscandoMoves(true);
        getMoves(id).then(data => {
            setMoves(data); 
            setBbuscandoMoves(false);
        });
    }

    useEffect(obtenerMoves, [id]);

    return { moves, buscandoMoves };
};

export default useMoves;