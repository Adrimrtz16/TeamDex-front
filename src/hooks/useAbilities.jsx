import { useState, useEffect } from 'react';
import { getAbilities } from '../services/getAbilities';

const useAbilities = (id) => {
    const [abilities, setAbilities] = useState();
    const [buscandoAbilities, setBbuscandoAbilities] = useState(true);
    
    function obtenerAbilities() {
        if (!id) return;
        setBbuscandoAbilities(true);
        getAbilities(id).then(data => {
            setAbilities(data); 
            setBbuscandoAbilities(false);
        });
    }

    useEffect(obtenerAbilities, [id]);

    return { abilities, buscandoAbilities };
};

export default useAbilities;