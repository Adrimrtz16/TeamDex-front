import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useBuildingTeam } from "../hooks/useBuildingTeam";
import { getPokemonSprite } from "../services/getPokemonSprite";
import useTeams from "../hooks/useTeams";
import Loader from "./loader/Loader";
import { Link } from "react-router-dom";


const TeamsPrinter = () => {

    const { isDarkMode } = useTheme();
    const { teams, buscandoTeams} = useTeams();
    const [teamsFormated, setTeamsFormated] = useState([]);
    
    useEffect(() => {
        const fetchSprites = async () => {
            if (!teams || teams.length === 0) {
                setTeamsFormated([]);
                return;
            }

            const allPokemonsArrays = teams.map(team => [
                team.name, [     
                    team.pokemon1,
                    team.pokemon2,
                    team.pokemon3,
                    team.pokemon4,
                    team.pokemon5,
                    team.pokemon6
                ],
                "external"
            ]);

            const teamsBuilt = await Promise.all(
                allPokemonsArrays.map(async ([teamName, pokemonsArray, teamId]) => {
                    const teamPokemons = useBuildingTeam(pokemonsArray);
                    for (const pokemon of teamPokemons) {
                        pokemon.sprite = await getPokemonSprite(pokemon.name);
                    }
                    return { teamName, pokemons: teamPokemons, id: teamId }; 
                })
            );

            setTeamsFormated(teamsBuilt);
        };

        fetchSprites();
    }, [teams]);


    // Variables para clases reutilizables
    const cardClass = `p-10 mt-20 mb-10 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`;

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center !mt-10 !mb-0">Equipos construidos por la comunidad</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className={cardClass}>
                        { buscandoTeams ? <Loader /> :  
                            <>
                                {teamsFormated && teams.length > 0
                                    ? teamsFormated
                                        .filter(team => team && team.pokemons && team.pokemons[0]?.name !== '')
                                        .map((team, index) => (
                                            <div key={index} className="row">
                                                <div className="col-md-12">
                                                    <div className={`rounded-lg p-4 mb-4 border-3 shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`}>
                                                        
                                                        <div className="row">
                                                            <div className="col-md-2 flex items-center justify-center">
                                                                <h3 className="text-xl font-semibold mb-2 text-center">{team.teamName}</h3>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="flex justify-center items-center flex-wrap">
                                                                    {team.pokemons.map((pokemon, idx) => (
                                                                        <div key={idx} className="m-2 text-center">
                                                                            <img
                                                                                src={pokemon.sprite}
                                                                                alt={pokemon.name}
                                                                                className="sprite"
                                                                            />
                                                                            <p className="mb-0">{pokemon.name}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2 flex items-center justify-center">
                                                                <Link className={`flex justify-center !no-underline`} to='/teams/teambuilder' state={{ team }}>
                                                                    <button className="px-6 py-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                                                                        Copiar
                                                                    </button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    : <p className="text-center">La comunidad no ha construido equipos por el momento</p>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamsPrinter;