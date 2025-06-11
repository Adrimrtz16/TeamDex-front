import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import useUserWithTeams from '../../hooks/useUserWithTeams';
import Loader from '../loader/Loader';
import { useBuildingTeam } from '../../hooks/useBuildingTeam';
import { useEffect, useState } from 'react';
import { getPokemonSprite } from '../../services/getPokemonSprite';
import useMe from '../../hooks/useMe';
import deleteDark from '../../assets/delete-dark.png';
import deleteLight from '../../assets/delete-light.png';
import { getDeleteTeam } from '../../services/teams/getDeleteTeam';

const TeamsMenu = () => {

    const { isDarkMode } = useTheme();

    const token = localStorage.getItem('token');
    const {me, buscandoMe} = useMe(token);
    const [teams, setTeams] = useState([]);
    
    useEffect(() => {
        const fetchSprites = async () => {
            if (!me || !me.teams) {
                setTeams([]);
                return;
            }

            const allPokemonsArrays = me.teams.map(team => [
                team.name, [     
                    team.pokemon1,
                    team.pokemon2,
                    team.pokemon3,
                    team.pokemon4,
                    team.pokemon5,
                    team.pokemon6
                ],
                team.id
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
    }, [me]);

    if(!token) {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center !mt-20'>Por favor, inicia sesión para ver tus equipos.</h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-12">
                    <div className={`mt-20 mb-10 bg-gray-100 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`}>
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className='text-center my-4'>Crea tu equipo o modifica uno ya existente</h1>
                                <Link className={`flex justify-center !no-underline ${isDarkMode ? 'text-white' : '!text-slate-800'}`} to='/teams/teambuilder'>
                                    <button className="px-6 py-2 mb-4 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                                        Nuevo equipo
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className={`mb-10 pb-2 bg-gray-100 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`}>
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className='text-center my-4'>Tus equipos</h1>
                            </div>
                        </div>
                        {teams && teams.length > 0
                            ? teams
                                .filter(team => team && team.pokemons && team.pokemons[0]?.name !== '')
                                .map((team, index) => (
                                    <div key={index} className="row mb-4">
                                        <div className="col-md-12">
                                            <div className={`rounded-lg mx-10 mb p-4 border-3 shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`}>
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
                                                    <div className="col-md-2 flex items-center justify-between align-middle">
                                                        <Link className={`flex justify-center !no-underline`} to='/teams/teambuilder' state={{ team }}>
                                                            <button className="px-6 py-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                                                                Editar
                                                            </button>
                                                        </Link>
                                                        <img onClick={() => getDeleteTeam(token, team.id)} className='cursor-pointer w-[55px]' src={`${isDarkMode ? deleteDark : deleteLight}`} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            : 
                            <div className='row'>
                                <div className='col-md-12'>
                                    <p className="text-center !mb-5">No tienes equipos construidos.</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamsMenu;