import { Link, useParams } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import useUserWithTeams from "../../hooks/useUserWithTeams";
import Loader from "../loader/Loader";
import { useBuildingTeam } from "../../hooks/useBuildingTeam";
import usePokemonSprites from "../../hooks/usePokemonSprites";
import { useEffect, useState } from "react";
import { getPokemonSprite } from "../../services/getPokemonSprite";

const UserSheet = () => {

    const { isDarkMode } = useTheme();
    const { id } = useParams();
    const {user, buscandoUser} = useUserWithTeams(id);
    const [teams, setTeams] = useState([]);
    
    useEffect(() => {
        const fetchSprites = async () => {
            if (!user || !user.teams) {
                setTeams([]);
                return;
            }

            const allPokemonsArrays = user.teams.map(team => [
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

            setTeams(teamsBuilt);
        };

        fetchSprites();
    }, [user]);

    // Variables para clases reutilizables
    const cardClass = `p-10 mt-20 mb-10 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`;
    const imgClass = `sprite w-100 rounded-lg border-3 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`;
    const titleClass = "text-3xl font-bold mb-2";
    const subtitleClass = "text-2xl font-semibold text-center mt-4";
    const textClass = "text-lg mb-4";

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className={cardClass}>
                        { buscandoUser ? <Loader /> :  
                            <>
                                <div className="row">
                                    <div className="col-md-3">
                                        <img className={imgClass} src={user.profilePictureUrl} alt="" />
                                    </div>
                                    <div className="col-md-9">
                                        <h1 className={titleClass}>{user.username} <span className="font-light">ID: {user.id}</span></h1>
                                        <p className={textClass}>{user.bio}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2 className={subtitleClass}>{user.username}'s Teams</h2>
                                    </div>
                                </div>
                                {teams && teams.length > 0
                                    ? teams
                                        .filter(team => team && team.pokemons && team.pokemons[0]?.name !== '')
                                        .map((team, index) => (
                                            <div key={index} className="row mb-4">
                                                <div className="col-md-12">
                                                    <div className={`rounded-lg p-4 border-3 shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`}>
                                                        
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
                                    : <p className="text-center">Este usuario no tiene equipos construidos.</p>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserSheet;