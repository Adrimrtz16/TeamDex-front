import { useState, useEffect } from 'react';
import { getPublicUsers } from '../services/auth/getPublicUsers';

const usePublicUsers = () => {
    const [users, setUsers] = useState([]);
    const [buscandoUsers, setBbuscandoUsers] = useState(true);
    
    function obtenerUsers() {
        setBbuscandoUsers(true);
        
        getPublicUsers().then(data => {
            setUsers(data); 
        });

        setBbuscandoUsers(false);
    }

    useEffect(obtenerUsers, []);

    return { users, buscandoUsers };
};

export default usePublicUsers;