import React from 'react';
import { useTheme } from '../../../../contexts/ThemeContext';

const Pokemon = ({ name , id , tipos, stats, abilities, setPokemonSeleccionadoId, setTeam, actualPokemon, setSearch, setNameFilter}) => {
    
    const { isDarkMode } = useTheme();
    const src = `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/${id}.png`;

    const typeSprites = [];
    const statColors = [];
    tipos.forEach((tipo) => {
        typeSprites.push(`https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-viii/sword-shield/${tipo}.png`);
    });
    
    stats.forEach((stat, index) => {
        if(stat <=40) statColors[index] = 'text-red-700';
        else if(stat <= 60) statColors[index] = 'text-red-500';
        else if(stat <= 80) statColors[index] = 'text-yellow-500';
        else if(stat <= 100) statColors[index] = 'text-lime-500';
        else if(stat <= 120) statColors[index] = 'text-green-500';
        else if(stat > 120) statColors[index] = 'text-green-700';
    });
    
    if (name.includes('-') && name !== 'chi-yu' && name !== 'ting-lu' && name !== 'chien-pao' && name !== 'wo-chien' && name !== 'mr-mime' && name !== 'mr-rime' && name !== 'mine-jr' && name !== 'ho-oh') {
        const parts = name.split('-');
        name = parts[0];
    }
    
    function seleccionarPokemon() {
        setSearch(2);
        setPokemonSeleccionadoId(id);
        setTeam(prevTeam => {
            const newTeam = [...prevTeam]; 
            newTeam[actualPokemon] = { ...newTeam[actualPokemon], 
                sprite: src,
                name: name,
                stats: stats,
                abilitie: "",
                moves: ['', '', '', '']}; 
            return newTeam;
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
        setNameFilter("");
    }
    
    return (
        <div className="col-3">
            <div onClick={seleccionarPokemon} className={` cursor-pointer flex flex-col justify-between my-2 rounded-lg shadow-md border-2 hover:shadow-lg transition p-2 text-center min-h-[258px] ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`}>
            {/* <div className="flex flex-col justify-center !items-center !bg-white my-2 rou rounded-lg shadow-md border-2 border-gray-300 hover:shadow-lg transition duration-300 ease-in-out text-center !min-h-[400px]"></div> */}
                <div>
                    <div className="row">
                        <div className="col-3">
                            <p className={`mb-0 ${statColors[0]}`}>HP</p>
                            <p className={`mb-1 ${statColors[0]}`}>{stats[0]}</p>
                            <p className={`mb-0 ${statColors[1]}`}>ATK</p>
                            <p className={`mb-1 ${statColors[1]}`}>{stats[1]}</p>
                            <p className={`mb-0 ${statColors[3]}`}>SP. ATK</p>
                            <p className={`mb-1 ${statColors[3]}`}>{stats[3]}</p>
                        </div>
                        <div className="col-6">
                            <img
                                loading="lazy"
                                src={src}
                                alt={name}
                                className="sprite"
                            />
                            <p className="mb-2">{name}</p>

                            <h6 className="mb-1">abilities</h6>
                            {abilities.map((ability,index) => 
                                <p key={index} className="text-[12px] my-0">{ability}</p>
                            )}
                        </div>
                        <div className="col-3 ">
                            <p className={`mb-0 ${statColors[5]}`}>SPD</p>
                            <p className={`mb-1 ${statColors[5]}`}>{stats[5]}</p>
                            <p className={`mb-0 ${statColors[2]}`}>DEF</p>
                            <p className={`mb-1 ${statColors[2]}`}>{stats[2]}</p>
                            <p className={`mb-0 ${statColors[4]}`}>SP. DEF</p>
                            <p className={`mb-1 ${statColors[4]}`}>{stats[4]}</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-2">
                    {typeSprites.map((sprite, index) => (
                        <img
                        key={index}
                        loading="lazy"
                        src={sprite}
                        alt={name}
                        className="w-26"
                        />
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default Pokemon;