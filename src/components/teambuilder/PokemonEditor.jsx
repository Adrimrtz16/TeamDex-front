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
import useMe from "../../hooks/useMe";
import { getCreateTeam } from "../../services/teams/getCreateTeam";
import { getUpdateTeam } from "../../services/teams/getUpdateTeam";
import Loader from "../loader/Loader";

const PokemonEditor = ({id, setNameFilter, nameFilter , pokemons , buscando , pokemonSeleccionado, setPokemonSeleccionado , setPokemonSeleccionadoId, team, setTeam, actualPokemon, search, setSearch, exportText, setExportText, exportTextTeam, setExportTextTeam, importTeam, setImportTeam, importedTeam}) => {

    const token = localStorage.getItem("token");
    const { isDarkMode } = useTheme();
    const { pokemonData: pokemon } = usePokemonData(id || team[actualPokemon].name.toLowerCase()
                                                                                    .replace(/[\s_]+/g, "-")
                                                                                    .replace(/-f$/, "-female")
                                                                                    .replace(/-m$/, "-male")
                                                                                    .replace(/^landorus$/, "landorus-incarnate")
                                                                                    .replace(/^tornadus$/, "tornadus-incarnate")
                                                                                    .replace(/^thundurus$/, "thundurus-incarnate")
                                                                                    .replace(/^enamorus$/, "enamorus-incarnate")
                                                                                    .replace(/^urshifu$/, "urshifu-single-strike") 
                                                                                );
        
    const { items = [], buscandoItems } = useItems(); 
    const { abilities = [], buscandoAbilities } = useAbilities(pokemon.id);
    const { moves = [], buscandoMoves } = useMoves(pokemon.id);

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

    useEffect(() => {
        if (pokemon && pokemon.stats) {
            setTeam(prevTeam => {
                const updatedTeam = [...prevTeam];
                updatedTeam[actualPokemon] = {
                    ...updatedTeam[actualPokemon],
                    name: pokemon.name,
                    sprite: pokemon.sprite,
                    stats: [
                        pokemon.stats[0],
                        pokemon.stats[1],
                        pokemon.stats[2],
                        pokemon.stats[3],
                        pokemon.stats[4],
                        pokemon.stats[5],
                    ],
                };
                return updatedTeam;
            });
        }
    }, [pokemon]);
    
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
        setName(team[actualPokemon].name.replace(/\s+/g, '-').toLowerCase() || "");
        setItem(team[actualPokemon].item.replace(/\s+/g, '-').toLowerCase() || "");
        setAbilitie(team[actualPokemon].abilitie.replace(/\s+/g, '-').toLowerCase() || "");
        setMoveSet(
            (team[actualPokemon].moves || ["", "", "", ""]).map(move => move.replace(/\s+/g, '-').toLowerCase())
        );
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
                            buscando={buscando} 
                            pokemonSeleccionado={pokemonSeleccionado}
                            setPokemonSeleccionado={setPokemonSeleccionado} 
                            setPokemonSeleccionadoId={setPokemonSeleccionadoId}
                            setTeam={setTeam}
                            actualPokemon={actualPokemon}
                            setSearch={setSearch}
                            setNameFilter={setNameFilter}
                        />
            case 2:
                return <ItemList
                            setTeam={setTeam}
                            actualPokemon={actualPokemon}
                            buscandoItems={buscandoItems}
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
                            level={level}
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
            .filter(move => move && move.trim() !== "")
            .map(
                (move) =>
                    `- ${move
                        .split('-')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}`
            )
            .join('\n');

return (
`${name.charAt(0).toUpperCase() + name.slice(1)} @ ${toTitleCase(item)}  \n` +
`Ability: ${toTitleCase(abilitie)}  \n` +
`Level: ${level}  \n` +
(shiny ? 'Shiny: Yes  \n' : '') +
`Tera Type: ${toTitleCase(teraType)}  \n` +
(formattedEVs ? `EVs: ${formattedEVs}  \n` : '') +
`${nature} Nature  \n` +
(formattedIVs ? `IVs: ${formattedIVs}  \n` : '') +
capitalizedMoves.split('\n').map(m => m +  '  \n').join('')
);

    }

    function toTitleCase(str) {
        return str
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    // Functions to get and save the team
    const [importText, setImportText] = useState("");
    const [teamName, setTeamName] = useState("");

    function saveTeam(team, maxSets = 6) {
        // 1) Partimos por dobles saltos de línea (o salto+espacios+salto)
        const rawSets = team
            .split(/\r?\n\s*\r?\n/)   // separa por líneas en blanco
            .map(s => s.trim())        // limpia espacios sobrantes al principio/final
            .filter(s => s.length > 0);

        // 2) Regex de validación multilineal (ya no necesita lidiar con espacios al final)
        const pattern = new RegExp([
            '^.+ @ .+ *',                   // Nombre @ objeto
            '\\nAbility: .+ *',             // Ability
            '(?:\\nLevel: \\d+ *)?',        // Level (opcional)
            '(?:\\nShiny: Yes *)?',         // Shiny opcional
            '(?:\\nTera Type: .+ *)?',      // Tera Type (opcional)
            '(?:\\nEVs: .+ *)?',            // EVs opcional
            '\\n[A-Za-z]+ Nature *',        // Nature
            '(?:\\nIVs: .+ *)?',            // IVs opcional
            '(?:\\n-.* *){1,4}',            // 1 a 4 movimientos            '$'
        ].join(''), '');

        // 3) Para cada uno de los primeros maxSets bloques:
        const result = [];
        for (let i = 0; i < maxSets; i++) {
            const block = rawSets[i] ?? '';
            if (!block) {
            result.push('');
            continue;
            }

            // 3a) normalizamos quitando espacios finales de cada línea
            const normalized = block
            .split('\n')
            .map(line => line.trimEnd())
            .join('\n');
            
            // 3b) validamos
            const cleaned = pattern.test(normalized) ? block.replace(/\n/g, '') : '';

            result.push(cleaned);
        }

        
        
        if(importedTeam) {
            if(importedTeam.id === "external") {
                console.log(importedTeam)
                console.log(result)
                getCreateTeam(teamName, result[0], result[1], result[2], result[3], result[4], result[5], token);
            } else {
                getUpdateTeam(teamName, result[0], result[1], result[2], result[3], result[4], result[5], token, importedTeam.id)
            }
        } else {
            getCreateTeam(teamName, result[0], result[1], result[2], result[3], result[4], result[5], token)
        }

        // window.location.href = '/teams';
    }

    useEffect(() => {
        if (importedTeam) {
            setTeamName(importedTeam.teamName || "");
            setTeam(importedTeam.pokemons.map(pokemon => ({
                name: pokemon.name || "",
                item: pokemon.item || "",
                abilitie: pokemon.abilitie || "",
                moves: pokemon.moves || ["", "", "", ""],
                stats: pokemon.stats || [0, 0, 0, 0, 0, 0],
                evs: pokemon.evs || [0, 0, 0, 0, 0, 0],
                ivs: pokemon.ivs || [31, 31, 31, 31, 31, 31],
                nature: pokemon.nature || "",
                natureUp: pokemon.natureUp || 1,
                natureDown: pokemon.natureDown || 1,
                natureNeutral: pokemon.natureNeutral || false,
                level: pokemon.level || 100,
                shiny: pokemon.shiny || false,
                teraType: pokemon.teraType || "normal",
                sprite: pokemon.sprite || ""
            })));
        }
    }, [importedTeam]);

    if(!token) {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-12">
                        <h1 className='text-center !mt-20'>Por favor, inicia sesión para editar tu equipo.</h1>
                    </div>
                </div>
            </div>
        );
    }

    if (!pokemon) return <Loader />; 
    
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
                                const min = 0;
                                const max = 160;
                                const percent = Math.max(0, Math.min(1, (stat - min) / (max - min)));
                                const r = Math.round(239 + (34 - 239) * percent);
                                const g = Math.round(68 + (197 - 68) * percent);
                                const b = Math.round(68 + (94 - 68) * percent);
                                const barColor = `rgb(${r},${g},${b})`;

                                return (
                                    <div key={i} className="flex items-center mb-0">
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
                <div className="col-12 pt-1">
                    <button className="px-8 py-2 my-2 !mr-4 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300" onClick={() => {setImportTeam(!importTeam); setSearch(0);}}>
                        Import Team
                    </button>
                    {!importTeam ? 
                        <>
                            <button className="px-8 py-2 my-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300" onClick={() => {setExportText(!exportText)} }>
                                Export Pokémon
                            </button>
                            <button className="px-8 py-2 mx-3 my-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300" onClick={() => {setExportTextTeam(!exportTextTeam)} }>
                                Export Team
                            </button>
                            <button className="px-8 py-2 my-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300" onClick={() => {saveTeam(team.map(pokemon => convertToTextFormat(pokemon)).join('\n\n'))}}>
                                Save Team
                            </button>
                            <input type="text" id="teamName" className={`w-auto p-2 rounded-lg border-2 !mx-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} placeholder="teamName" value={teamName} onChange={e => {setTeamName(e.target.value)}}/>

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
                            </> :
                            <>
                                <button className="px-8 py-2 my-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300" onClick={() => {saveTeam(importText)}} >
                                    Save
                                </button>
                                <input type="text" id="teamName" className={`w-auto p-2 rounded-lg border-2 !mx-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} placeholder="teamName" value={teamName} onChange={e => {setTeamName(e.target.value)}}/>

                                <textarea
                                        className={`w-full mt-2 p-2 rounded-lg border-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`}
                                        rows={12}
                                        value={importText}
                                        onChange={e => {setImportText(e.target.value)}}
                                />
                            </>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {busquedaEditor()}
                </div>
            </div>
        </div>
    );
}

export default PokemonEditor;