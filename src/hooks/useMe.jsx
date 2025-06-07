import { useState, useEffect } from 'react';
import { getMe } from '../services/auth/getMe';

const useMe = (token) => {
    const [me, setMe] = useState([]);
    const [buscandoMe, setBuscandoMe] = useState(true);
    
    function obtenerMe() {
        if (!token) return;
        
        setBuscandoMe(true);
        
        getMe(token).then(data => {
            setMe(data); 
        });

        setBuscandoMe(false);
    }

    useEffect(obtenerMe, [token]);

    return { me, buscandoMe };
};

export default useMe;