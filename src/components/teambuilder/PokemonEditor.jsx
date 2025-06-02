import usePokemonData from "../../hooks/usePokemonData";
import { useTheme } from "../../contexts/ThemeContext";
import { useEffect, useState } from "react";
import PokemonList from "./searchViews/pokemon/PokemonList";
import ItemList from "./searchViews/items/ItemList";
import useItems from "../../hooks/useItems";
import AbilityList from "./searchViews/abilitie/AbilitieList";
import useAbilities from "../../hooks/useAbilities";
import useMoves from "../../hooks/useMoves";
import MoveList from "./searchViews/moves/MoveList";
import StatsEditor from "./searchViews/stats/StatsEditor";
import MiscellaneousEditor from "./searchViews/miscelaneous/MiscelaneousEditor";

const PokemonEditor = ({id, setNameFilter, nameFilter , pokemons , loading , pokemonSeleccionado, setPokemonSeleccionado , setPokemonSeleccionadoId, team, setTeam, actualPokemon, search, setSearch, exportText, setExportText, exportTextTeam, setExportTextTeam}) => {

    const { isDarkMode } = useTheme();
    const { pokemonData: pokemon } = usePokemonData(id);

    const { items = [], buscando } = useItems(); 
    const { abilities = [], buscandoAbilities } = useAbilities(id);
    const { moves = [], buscandoMoves } = useMoves(id);

    const [name, setName] = useState(team[actualPokemon].name || "");
    const [item, setItem] = useState(team[actualPokemon].item || "");
    const [abilitie, setAbilitie] = useState(team[actualPokemon].abilitie || "");
    const [moveSet, setMoveSet] = useState(team[actualPokemon].moves || ["", "", "", ""]);
    const [moveIndex, setMoveIndex] = useState(0);
    const [stats, setStats] = useState(team[actualPokemon].stats || [0, 0, 0, 0, 0, 0]);
    const [evs, setEvs] = useState(team[actualPokemon].evs || [0, 0, 0, 0, 0, 0]);
    const [ivs, setIvs] = useState(team[actualPokemon].ivs || [31, 31, 31, 31, 31, 31]);
    const [nature, setNature] = useState(team[actualPokemon].nature || "");
    const [natureUp, setNatureUp] = useState(team[actualPokemon].natureUp || 1);
    const [natureDown, setNatureDown] = useState(team[actualPokemon].natureDown || 1);
    const [natureNeutral, setNatureNeutral] = useState(team[actualPokemon].natureNeutral || false);
    const [level, setLevel] = useState(team[actualPokemon].level || 100);
    const [shiny, setShiny] = useState(team[actualPokemon].shiny || false);
    const [teraType, setTeraType] = useState(team[actualPokemon].teraType || "normal");
    const [itemFilter, setItemFilter] = useState("");
    const [abilitieFilter, setAbilitieFilter] = useState("");
    const [moveFilter, setMoveFilter] = useState("");

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(itemFilter.toLowerCase())
    );

    const filteredAbilities = abilities.filter(abilitie =>
        abilitie.name.toLowerCase().includes(abilitieFilter.toLowerCase())
    );

    const filteredMoves = moves
        .filter(move => move.name.toLowerCase().includes(moveFilter.toLowerCase()))
        .filter(move => !moveSet.includes(move.name));


    useEffect(() => {
        setName(team[actualPokemon].name || "");
        setItem(team[actualPokemon].item || "");
        setAbilitie(team[actualPokemon].abilitie || "");
        setMoveSet(team[actualPokemon].moves || ["", "", "", ""]);
        setStats(team[actualPokemon].stats || [0, 0, 0, 0, 0, 0]);
        setEvs(team[actualPokemon].evs || [0, 0, 0, 0, 0, 0]);
        setIvs(team[actualPokemon].ivs || [31, 31, 31, 31, 31, 31]);
        setNature(team[actualPokemon].nature || "");
        setNatureUp(team[actualPokemon].natureUp || 1);
        setNatureDown(team[actualPokemon].natureDown || 1);
        setNatureNeutral(team[actualPokemon].natureNeutral || false);
        setLevel(team[actualPokemon].level || 100);
        setShiny(team[actualPokemon].shiny || false);
        setTeraType(team[actualPokemon].teraType || "normal");
    }, [actualPokemon, team]);

    function changePokemonName(e) {
        setName(e);
        setNameFilter(e);
    }

    function changePokemonItem(e) {
        setItem(e);
        setItemFilter(e);
    }

    function changePokemonAbilitie(e) {
        setAbilitie(e);
        setAbilitieFilter(e);
    }

    function changePokemonMove(e) {
        const newMoves = [...moveSet];
        newMoves[moveIndex] = e;
        setMoveSet(newMoves);
        setMoveFilter(e);
    }

    function busquedaEditor() {
        switch (search) {
            case 0:
                return <></>
            case 1:
                return <PokemonList 
                            nameFilter={nameFilter} 
                            pokemons={pokemons} 
                            loading={loading} 
                            pokemonSeleccionado={pokemonSeleccionado}
                            setPokemonSeleccionado={setPokemonSeleccionado} 
                            setPokemonSeleccionadoId={setPokemonSeleccionadoId}
                            setTeam={setTeam}
                            actualPokemon={actualPokemon}
                            setSearch={setSearch}
                        />
            case 2:
                return <ItemList
                            setTeam={setTeam}
                            actualPokemon={actualPokemon}
                            buscando={buscando}
                            filteredItems={filteredItems}
                            setSearch={setSearch}
                        />
            case 3: 
                return <AbilityList 
                            setTeam={setTeam}
                            actualPokemon={actualPokemon}
                            buscando={buscandoAbilities}
                            filteredAbilities={filteredAbilities}
                            setSearch={setSearch}
                        />
            case 4:
                return <MoveList
                            setTeam={setTeam}
                            actualPokemon={actualPokemon}
                            buscando={buscandoMoves}
                            filteredMoves={filteredMoves}
                            moveIndex={moveIndex}
                            setSearch={setSearch}
                            setMoveIndex={setMoveIndex}
                            setMoveFilter={setMoveFilter}
                        />
            case 5:
                return <StatsEditor
                            setTeam={setTeam}
                            actualPokemon={actualPokemon}
                            setSearch={setSearch}
                            stats={stats}
                            evs={evs}
                            setEvs={setEvs}
                            ivs={ivs}
                            setIvs={setIvs}
                            nature={nature}
                            setNature={setNature}
                            natureUp={natureUp}
                            setNatureUp={setNatureUp}
                            natureDown={natureDown}
                            setNatureDown={setNatureDown}
                            team={team}
                            setNatureNeutral={setNatureNeutral}
                            natureNeutral={natureNeutral}
                        />
            case 6:
                return <MiscellaneousEditor
                            setTeam={setTeam}
                            actualPokemon={actualPokemon}
                            setSearch={setSearch}
                            level={level}
                            setLevel={setLevel}
                            shiny={shiny}
                            setShiny={setShiny}
                            teraType={teraType}
                            setTeraType={setTeraType}
                        />
        }
    }

    function convertToTextFormat(pokemonData) {
        const {
            name,
            item,
            abilitie,
            level,
            shiny,
            teraType,
            evs,
            ivs,
            nature,
            moves,
        } = pokemonData;

        const statLabels = ['HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'];
        const formattedEVs = evs
            .map((val, idx) => (val > 0 ? `${val} ${statLabels[idx]}` : null))
            .filter(Boolean)
            .join(' / ');

        const formattedIVs = ivs
            .map((val, idx) => (val !== 31 ? `${val} ${statLabels[idx]}` : null))
            .filter(Boolean)
            .join(' / ');

        const capitalizedMoves = [...moves]
            .map(
            (move) =>
                `- ${move
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}`
            )
            .join('\n');

return `${name.charAt(0).toUpperCase() + name.slice(1)} @ ${toTitleCase(item)}
Ability: ${toTitleCase(abilitie)}
Level: ${level}
${shiny ? 'Shiny: Yes\n' : ''}Tera Type: ${toTitleCase(teraType)}
${formattedEVs ? `EVs: ${formattedEVs}\n` : ''}${nature} Nature
${formattedIVs ? `IVs: ${formattedIVs}\n` : ''}${capitalizedMoves}`;
    }

    function toTitleCase(str) {
        return str
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }


    if (!pokemon) return <div>Cargando...</div>; 

    return (
        <div className="pt-[40px] pb-[20px]">
            <div className="row">
                <div className="col-2">
                    <img className={`w-37 rounded-lg border-3 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} src={team[actualPokemon].sprite}  alt="" />
                </div>
                <div className="col-3">
                    <div className="flex justify-center items-center gap-2">
                        <label className="ml-[2px]" htmlFor="name">Name: </label>
                        <input type="text" id="name" className={`w-auto p-2 rounded-lg border-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} placeholder="name" value={name} onClick={() => setSearch(1)} onChange={e => changePokemonName(e.target.value)}/>
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-2">
                        <label className="ml-3" htmlFor="item">Item: </label>
                        <input type="text" id="item" className={`w-auto p-2 rounded-lg border-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} placeholder="item" value={item} onClick={() => setSearch(2)} onChange={e => changePokemonItem(e.target.value)}/>
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-2">
                        <label htmlFor="ability">Ability: </label>
                        <input type="text" id="ability" className={`w-auto p-2 rounded-lg border-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} placeholder="abilitie" value={abilitie} onClick={() => setSearch(3)} onChange={e => changePokemonAbilitie(e.target.value)}/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="flex gap-2">
                        <input type="text" id="name" className={`p-2 w-100 rounded-lg border-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} placeholder="move 1" value={moveSet[0]} onClick={() => {setSearch(4); setMoveIndex(0)}} onChange={e => changePokemonMove(e.target.value)}/>
                        <input type="text" id="name" className={`p-2 w-100 rounded-lg border-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} placeholder="move 3" value={moveSet[2]} onClick={() => {setSearch(4); setMoveIndex(2)}} onChange={e => changePokemonMove(e.target.value)}/>
                    </div>
                    <div className="flex gap-2 mt-2">
                        <input type="text" id="name" className={`p-2 w-100 rounded-lg border-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} placeholder="move 2" value={moveSet[1]} onClick={() => {setSearch(4); setMoveIndex(1)}} onChange={e => changePokemonMove(e.target.value)}/>
                        <input type="text" id="item" className={`p-2 w-100 rounded-lg border-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} placeholder="move 4" value={moveSet[3]} onClick={() => {setSearch(4); setMoveIndex(3)}} onChange={e => changePokemonMove(e.target.value)}/>
                    </div>
                    <div className="flex gap-2 mt-2">
                        <p className="pt-[10px] mb-0">Level/Shiny/Tera </p>
                        <input type="text" id="extradata" readOnly className={`w-[48px] p-2 rounded-lg border-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} value={level} onClick={() => setSearch(6)} />
                        <input type="text" id="extradata" readOnly className={`w-[51px] p-2 rounded-lg border-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} value={shiny} onClick={() => setSearch(6)} />
                        <input type="text" id="extradata" readOnly className={`w-100 p-2 rounded-lg border-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} value={teraType} onClick={() => setSearch(6)} />
                     </div>
                </div>
                <div className="col-3">
                    <div id="evs" className={`cursor-pointer h-100 w-100 pl-2 rounded-lg border-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} onClick={() => setSearch(5)}>
                        <div className="flex flex-col h-full text-sm pt-[12px] pl-[9px]"> 
                            {pokemon && pokemon.stats && stats.map((stat, i) => {
                                // Normaliza el stat entre 0 y 255 (ajusta el máximo según tus stats)
                                const min = 0;
                                const max = 160;
                                const percent = Math.max(0, Math.min(1, (stat - min) / (max - min)));
                                // Interpolación de color de rojo (#ef4444) a verde (#22c55e)
                                const r = Math.round(239 + (34 - 239) * percent);
                                const g = Math.round(68 + (197 - 68) * percent);
                                const b = Math.round(68 + (94 - 68) * percent);
                                const barColor = `rgb(${r},${g},${b})`;

                                return (
                                    <div key={i} className="flex items-center mb-[10px] mb-0">
                                        <span className="w-20 text-left mr-2">
                                            {["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"][i]}:
                                        </span>
                                        <div
                                            className="h-4 rounded"
                                            style={{
                                                width: `${stat / 3}px`,
                                                minWidth: "10px",
                                                background: barColor,
                                                transition: "background 0.3s"
                                            }}
                                        ></div>
                                        <span className="ml-2 w-10">{stat}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {busquedaEditor()}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <button className="px-8 py-2 my-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300" onClick={() => {setExportText(true); setExportTextTeam(false)} }>
                        Export Pokémon
                    </button>
                    <button className="px-8 py-2 mx-3 my-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300" onClick={() => {setExportText(false); setExportTextTeam(true)} }>
                        Export Team
                    </button>
                    <button className="px-8 py-2 my-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300" onClick={() => saveTeam()}>
                        Save Team
                    </button>
                    {exportText && (
                        <textarea
                            className={`w-full mt-2 p-2 rounded-lg border-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`}
                            value={convertToTextFormat(team[actualPokemon])}
                            readOnly
                            rows={12}
                        />
                    )} 
                    {exportTextTeam && (
                        <textarea
                            className={`w-full mt-2 p-2 rounded-lg border-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`}
                            value={team.map(pokemon => convertToTextFormat(pokemon)).join('\n\n')}
                            readOnly
                            rows={12}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default PokemonEditor;