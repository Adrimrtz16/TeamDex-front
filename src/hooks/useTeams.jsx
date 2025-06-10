import { useEffect, useState } from "react";
import { getTeams } from "../services/teams/getTeams";


const useTeams = () => {

    const [teams, setTeams] = useState([]);
    const [buscandoTeams, setBuscandoTeams] = useState(true);
        
        function obtenerTeams() {
            
            setBuscandoTeams(true);
            
            getTeams().then(data => {
                setTeams(data); 
            });
    
            setBuscandoTeams(false);
        }
    
    useEffect(obtenerTeams, []);

    return { teams, buscandoTeams };
}

export default useTeams;