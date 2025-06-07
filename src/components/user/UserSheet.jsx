import { useParams } from "react-router-dom";
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
                team.pokemon1,
                team.pokemon2,
                team.pokemon3,
                team.pokemon4,
                team.pokemon5,
                team.pokemon6
            ]);

            const teamsBuilt = allPokemonsArrays.map(pokemonsArray => useBuildingTeam(pokemonsArray));

            // Esperar a que todas las promesas de sprites se resuelvan
            for (const team of teamsBuilt) {
                for (const pokemon of team) {
                    const sprite = await getPokemonSprite(pokemon.name);
                    console.log(`Sprite for ${pokemon.name}:`, sprite); // sprite será la URL
                    pokemon.sprite = sprite;
                }
            }

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
                <div className="col-12">
                    <div className={cardClass}>
                        { buscandoUser ? <Loader /> :  
                            <>
                                <div className="row">
                                    <div className="col-3">
                                        <img className={imgClass} src={user.profilePictureUrl} alt="" />
                                    </div>
                                    <div className="col-9">
                                        <h1 className={titleClass}>{user.username} <span className="font-light">ID: {user.id}</span></h1>
                                        <p className={textClass}>{user.bio}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <h2 className={subtitleClass}>{user.username}'s Teams</h2>
                                    </div>
                                </div>
                                {teams && teams
                                    .filter(team => team && team[0].name != '') // Filtra equipos vacíos
                                    .map((team, index) => (
                                        <div key={index} className="row mb-4">
                                            <div className="col-12">
                                                <h3 className="text-xl font-semibold mb-2 text-center">Equipo {index}</h3>
                                                <div className={`d-flex flex-wrap justify-content-center bg-white rounded-lg p-4 border-3 shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`}>
                                                    {team.map((pokemon, idx) => (
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
                                        </div>
                                    ))
                                    ||
                                    <p className="text-center">Este usuario no tiene equipos construidos.</p>
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