import { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import PokemonSprite from "./PokemonSprite";
import PokemonList from "./searchViews/pokemon/PokemonList";
import NameFilter from "./filters/NameFilter";
import PokemonEditor from "./PokemonEditor";
import usePokemons from "../../hooks/usePokemons";

const TeamBuilderMenu = () => {

    const pokemonTeamplate = {
        name: '',
        level: 100,
        shiny: false,
        sprite: '',
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

    const { pokemons, loading } = usePokemons();
    const [nameFilter, setNameFilter] = useState("");
    const { isDarkMode } = useTheme();
    const [pokemonSeleccionado, setPokemonSeleccionado] = useState(false);
    const [pokemonSeleccionadoId, setPokemonSeleccionadoId] = useState(null);

    const [team, setTeam] = useState(
        Array.from({ length: 6 }, () => ({ ...pokemonTeamplate }))
    );

    const [search, setSearch] = useState(0);
    const [exportText, setExportText] = useState(false);
    const [exportTextTeam, setExportTextTeam] = useState(false);

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
                                    />
                                ))}
                            </div>
                            <div className="col-10">
                                <div className='mr-10'>
                                    {!pokemonSeleccionado ? (
                                        <>
                                            <NameFilter setNameFilter={setNameFilter} />
                                            <PokemonList 
                                                nameFilter={nameFilter} 
                                                pokemons={pokemons} 
                                                loading={loading} 
                                                pokemonSeleccionado={pokemonSeleccionado}
                                                setPokemonSeleccionado={setPokemonSeleccionado} 
                                                setPokemonSeleccionadoId={setPokemonSeleccionadoId}
                                                setTeam={setTeam}
                                                actualPokemon={actualPokemon}
                                            />
                                        </>)
                                    : <PokemonEditor 
                                        setNameFilter={setNameFilter}
                                        id={pokemonSeleccionadoId}
                                        nameFilter={nameFilter} 
                                        pokemons={pokemons} 
                                        loading={loading} 
                                        pokemonSeleccionado={pokemonSeleccionado}
                                        setPokemonSeleccionado={setPokemonSeleccionado} 
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
                                    /> }
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