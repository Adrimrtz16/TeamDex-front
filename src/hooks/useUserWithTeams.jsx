import { useState, useEffect } from 'react';
import { getUserWithTeams } from '../services/auth/getUserWithTeams';

const useUserWithTeams = (id) => {
    const [user, setUser] = useState([]);
    const [buscandoUser, setBuscandoUser] = useState(true);
    
    function obtenerUser() {
        if (!id) return;
        
        setBuscandoUser(true);
        
        getUserWithTeams(id).then(data => {
            setUser(data); 
        });

        setBuscandoUser(false);
    }

    useEffect(obtenerUser, []);

    return { user, buscandoUser };
};

export default useUserWithTeams;