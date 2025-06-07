import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import PokemonSprite from "./PokemonSprite";
import PokemonEditor from "./PokemonEditor";
import usePokemons from "../../hooks/usePokemons";
import addDark from '../../assets/addDark.png';
import addLight from '../../assets/addLight.png';

const TeamBuilderMenu = () => {

    const { isDarkMode } = useTheme();
    const addImg = isDarkMode ? addDark : addLight;

    const pokemonTeamplate = {
        name: '',
        level: 100,
        shiny: false,
        sprite: `${addImg}`,
        item: '',
        teraType: 'normal',
        abilitie: '',
        moves: ['', '', '', ''],
        nature: '',
        natureUp: 1,
        natureDown: 1,
        natureNeutral: false,
        stats: [0, 0, 0, 0, 0, 0],
        evs: [0, 0, 0, 0, 0, 0],
        ivs: [31, 31, 31, 31, 31, 31]
    }

    const [actualPokemon, setActualPokemon] = useState(0);

    const { pokemons, buscando } = usePokemons();
    const [nameFilter, setNameFilter] = useState("");
    const [pokemonSeleccionadoId, setPokemonSeleccionadoId] = useState(null);

    const [team, setTeam] = useState(
        Array.from({ length: 6 }, () => ({ ...pokemonTeamplate }))
    );

    const [search, setSearch] = useState(1);
    const [exportText, setExportText] = useState(false);
    const [exportTextTeam, setExportTextTeam] = useState(false);
    const [importTeam, setImportTeam] = useState(false);

    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <div className={`mt-20 mb-10 bg-gray-100 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950' : 'bg-gray-100'}`}>
                        <div className="row">
                            <div className="col-2 p-4">
                                {team.map((team, index) => (
                                    <PokemonSprite
                                        key={index}
                                        id={index}
                                        sprite={team.sprite}
                                        setActualPokemon={setActualPokemon}
                                        search={search}
                                        setSearch={setSearch}
                                        setExportText={setExportText}
                                        setExportTextTeam={setExportTextTeam}
                                        addImg={addImg}
                                    />
                                ))}
                            </div>
                            <div className="col-10">
                                <div className='mr-10'>
                                    <PokemonEditor 
                                        setNameFilter={setNameFilter}
                                        id={pokemonSeleccionadoId}
                                        nameFilter={nameFilter} 
                                        pokemons={pokemons} 
                                        buscando={buscando} 
                                        setPokemonSeleccionadoId={setPokemonSeleccionadoId}
                                        setTeam={setTeam}
                                        team={team}
                                        actualPokemon={actualPokemon}
                                        setSearch={setSearch}
                                        search={search}
                                        exportText={exportText}
                                        setExportText={setExportText}
                                        exportTextTeam={exportTextTeam}
                                        setExportTextTeam={setExportTextTeam} 
                                        importTeam={importTeam}
                                        setImportTeam={setImportTeam}
                                        addImg={addImg}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    );

}

export default TeamBuilderMenu;