import { use, useEffect, useState } from "react";
import { useTheme } from "../../../../contexts/ThemeContext";
import pokemonNatures from "../../../../mocks/mockNatures.js"; // Asegúrate de que la ruta sea correcta

const StatsEditor = ({setTeam, actualPokemon, stats, evs, setEvs, ivs, setIvs, nature, setNature, natureUp, setNatureUp, natureDown, setNatureDown, team, natureNeutral, setNatureNeutral, level}) => {
    
    const { isDarkMode } = useTheme();

    const statColors = [];

    stats.forEach((stat, index) => {
        if(stat <= 40) statColors[index] = 'text-red-700';
        else if(stat <= 60) statColors[index] = 'text-red-500';
        else if(stat <= 80) statColors[index] = 'text-yellow-500';
        else if(stat <= 100) statColors[index] = 'text-lime-500';
        else if(stat <= 120) statColors[index] = 'text-green-500';
        else if(stat > 120) statColors[index] = 'text-green-700';
    });

    const [finalStats, setFinalStats] = useState([0, 0, 0, 0, 0, 0]);

    const evsRemaining = 508 - evs.reduce((acc, curr) => acc + curr, 0);

    function evsChange(index, value) {
        const newEvs = [...evs];

        value = Number(value);
        if (value < 0) value = 0;
        if (value > 252) value = 252;

        const totalEvs = evs.reduce((acc, curr) => acc + curr, 0);

        // Permitir siempre disminuir, solo permitir aumentar si no se supera el límite
        if (value <= evs[index] || totalEvs - evs[index] + value <= 508) {
            newEvs[index] = value;
            setEvs(newEvs);
        }

        setTeam(prevTeam => {
            const newTeam = [...prevTeam];
            newTeam[actualPokemon] = {
                ...newTeam[actualPokemon],
                evs: newEvs
            };
            return newTeam;
        });
    };

    function ivsChange(index, value) {
        value = Number(value);
        if (value < 0) value = 0;
        if (value > 31) value = 31;

        const newIvs = [...ivs];
        newIvs[index] = Number(value);
        setIvs(newIvs);

        setTeam(prevTeam => {
            const newTeam = [...prevTeam];
            newTeam[actualPokemon] = {
                ...newTeam[actualPokemon],
                ivs: newIvs
            };
            return newTeam;
        });
    };

    useEffect(() => {
        calculateFinalStats();
    }, [evs, ivs, stats, nature]);

    function calculateFinalStats() {

        const newFinalStats = stats.map((stat, index) => {

            const ev = evs[index];
            const iv = ivs[index];
            const baseStat = stat;

            let natureBoost = 1;
            if( index === Number(natureUp) && index === Number(natureDown)) { 
                natureBoost = 1;
            } else if(index === Number(natureUp)) {
                natureBoost = 1.1;
            } else if(index === Number(natureDown)) {
                natureBoost = 0.9;
            }
            
            if( index === 0) { // HP stat calculation
                return Math.floor((2 * baseStat + iv + (ev / 4)) * level / 100) + level + 10; 
            }
            return Math.floor((((2 * baseStat + iv + (ev / 4)) * level / 100) + 5) * natureBoost);
        });

        setFinalStats(newFinalStats);
    }

    function natureChange() {
        const natures = pokemonNatures;

        const natureActual = natures.find(nature =>
            nature.boosts === Number(natureUp) && nature.reduces === Number(natureDown)
        );

        const natureName = natureActual.name; 

        setNature(natureName);

        setTeam(prevTeam => {
            const newTeam = [...prevTeam];
            newTeam[actualPokemon] = {
                ...newTeam[actualPokemon],
                nature: natureName,
                natureUp: Number(natureUp),
                natureDown: Number(natureDown),
                natureNeutral: natureNeutral
            };
            return newTeam;
        });
        
    }

    useEffect(() => {
        if (natureNeutral) {
            setNature("Hardy"); 
            setNatureUp("1");
            setNatureDown("1");
        }
    }, [natureNeutral]);

    useEffect(() => {
        if (natureUp && natureDown) {
            natureChange();
        }
    }
    , [natureUp, natureDown]);

    useEffect(() => {
        if (typeof team !== "undefined" && team[actualPokemon]) {
            setNatureUp(String(team[actualPokemon].natureUp ?? ""));
            setNatureDown(String(team[actualPokemon].natureDown ?? ""));
            setNatureNeutral(team[actualPokemon].natureNeutral ?? false);
        }
    }, [actualPokemon]);

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className={`my-2 rounded-lg shadow-md border-2 hover:shadow-lg transition p-2 text-center min-h-[118px] ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`}>
                        <div className="row">
                            <div className="col-md-2">
                                <h5 className="mb-1 ml-4 text-left">Base stats</h5>
                            </div>
                            <div className="col-md-3">
                                <h5 className="mb-1 text-left">Evs <span className="text-sm">Remaining: {evsRemaining}</span></h5>
                            </div>
                            <div className="col-md-2">
                                <h5 className="mb-1 ml-4 text-left whitespace-nowrap">Nature <span className="text-sm">{nature}</span></h5>
                            </div>
                            <div className="col-md-1">
                                <h5 className="mb-1 text-left">Ivs</h5>
                            </div>
                            <div className="col-md-3">
                                <h5 className="mb-1 ml-4 text-left">Final stats</h5>
                            </div>
                            <div className="col-md-2">
                                <div className="ml-4">
                                    <p className="mb-0 pb-[10px] text-left">HP: <span className={`${statColors[0]}`}>{stats[0]}</span></p>
                                    <p className="mb-0 pb-[10px] text-left">Attack: <span className={`${statColors[1]}`}>{stats[1]}</span></p>
                                    <p className="mb-0 pb-[10px] text-left">Defense: <span className={`${statColors[2]}`}>{stats[2]}</span></p>
                                    <p className="mb-0 pb-[10px] text-left">Sp. Atk: <span className={`${statColors[3]}`}>{stats[3]}</span></p>
                                    <p className="mb-0 pb-[10px] text-left">Sp. Def: <span className={`${statColors[4]}`}>{stats[4]}</span></p>
                                    <p className="mb-0 pb-[10px] text-left">Speed: <span className={`${statColors[5]}`}>{stats[5]}</span></p>
                                </div>
                            </div>
                            <div className="col-md-2 flex flex-col items-start justify-end gap-[18px] pb-[29px]">
                                {evs.map((ev, index) => (
                                    <input key={index} type="range" min="0" max="252" value={ev} onChange={e => evsChange(index, e.target.value)}/>
                                ))}
                            </div>
                            <div className="col-md-1 flex flex-col items-start justify-end gap-2 pb-4">
                                {evs.map((ev, index) => (
                                    <input className="border-1 pl-1" key={index} type="number" min="0" max="252" value={ev} onChange={e => evsChange(index, e.target.value)}/>
                                ))}
                            </div>
                            { !natureNeutral ? (
                                <>
                                <div className="col-md-1">
                                    <div className="flex ml-4 gap-2 mb-[10px]">
                                        <input className="mt-0" id="neutral" name="nature-neutral" type="checkbox" checked={natureNeutral} onChange={e => setNatureNeutral(e.target.checked)} />
                                        <p className="mb-0">Neutral</p>
                                    </div>
                                    <div className="flex ml-4 gap-2 mb-[10px]">
                                        <input className="mt-0" id="1-up" name="nature-up" type="radio" value={1} checked={natureUp === 1} onChange={e => setNatureUp(e.target.value)}/>
                                        <p className="mb-0">Up</p>
                                    </div>
                                    <div className="flex ml-4 gap-2 mb-[10px]">
                                        <input className="mt-0" id="2-up" name="nature-up" type="radio" value={2} checked={natureUp === 2} onChange={e => setNatureUp(e.target.value)}/>
                                        <p className="mb-0">Up</p>
                                    </div>
                                    <div className="flex ml-4 gap-2 mb-[10px]">
                                        <input className="mt-0" id="3-up" name="nature-up" type="radio" value={3} checked={natureUp === 3} onChange={e => setNatureUp(e.target.value)}/>
                                        <p className="mb-0">Up</p>
                                    </div>
                                    <div className="flex ml-4 gap-2 mb-[10px]">
                                        <input className="mt-0" id="4-up" name="nature-up" type="radio" value={4} checked={natureUp === 4} onChange={e => setNatureUp(e.target.value)}/>
                                        <p className="mb-0">Up</p>
                                    </div>
                                    <div className="flex ml-4 gap-2 mb-[10px]">
                                        <input className="mt-0" id="5-up" name="nature-up" type="radio" value={5} checked={natureUp === 5} onChange={e => setNatureUp(e.target.value)}/>
                                        <p className="mb-0">Up</p>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div className="flex gap-2 mt-[34px] mb-[10px]">
                                        <input className="mt-0" id="1-down" name="nature-down" type="radio" value={1} checked={natureDown === 1} onChange={e => setNatureDown(e.target.value)}/>
                                        <p className="mb-0">Down</p>
                                    </div>
                                    <div className="flex gap-2 mb-[10px]">
                                        <input className="mt-0" id="2-down" name="nature-down" type="radio" value={2} checked={natureDown === 2} onChange={e => setNatureDown(e.target.value)}/>
                                        <p className="mb-0">Down</p>
                                    </div>
                                    <div className="flex gap-2 mb-[10px]">
                                        <input className="mt-0" id="3-down" name="nature-down" type="radio" value={3} checked={natureDown === 3} onChange={e => setNatureDown(e.target.value)}/>
                                        <p className="mb-0">Down</p>
                                    </div>
                                    <div className="flex gap-2 mb-[10px]">
                                        <input className="mt-0" id="4-down" name="nature-down" type="radio" value={4} checked={natureDown === 4} onChange={e => setNatureDown(e.target.value)}/>
                                        <p className="mb-0">Down</p>
                                    </div>
                                    <div className="flex gap-2 mb-[10px]">
                                        <input className="mt-0" id="5-down" name="nature-down" type="radio" value={5} checked={natureDown === 5} onChange={e => setNatureDown(e.target.value)}/>
                                        <p className="mb-0">Down</p>
                                    </div>
                                </div>
                                </>) : (
                                <>
                                <div className="col-md-1">
                                    <div className="flex ml-4 gap-2 mb-[10px]">
                                        <input className="mt-0" id="neutral" name="nature-neutral" type="checkbox" checked={natureNeutral}  onChange={e => setNatureNeutral(e.target.checked)} />
                                        <p className="mb-0">Neutral</p>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                </div>
                                </>)}
                            
                            <div className="col-md-1 flex flex-col items-start justify-end gap-2 pb-4">
                                {ivs.map((iv, index) => (
                                    <input className="border-1 pl-1" key={index} type="number" min="0" max="252" value={iv} onChange={e => ivsChange(index, e.target.value)}/>
                                ))}
                            </div>
                            <div className="col-md-4">
                                <div className="ml-4">
                                    {finalStats.map((stat, i) => {
                                        // Normaliza el stat entre 0 y 255 (ajusta el máximo según tus stats)
                                        const min = 0;
                                        const max = 400;
                                        const percent = Math.max(0, Math.min(1, (stat - min) / (max - min)));
                                        // Interpolación de color de rojo (#ef4444) a verde (#22c55e)
                                        const r = Math.round(239 + (34 - 239) * percent);
                                        const g = Math.round(68 + (197 - 68) * percent);
                                        const b = Math.round(68 + (94 - 68) * percent);
                                        const barColor = `rgb(${r},${g},${b})`;

                                        return (
                                            <div key={i} className="flex items-center mb-[10px]">
                                                <span className="w-20 text-left mr-2">
                                                    {["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"][i]}:
                                                </span>
                                                <div
                                                    className="h-4 rounded"
                                                    style={{
                                                        width: `${stat / 4.2}px`,
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
                </div>
            </div>
        </>
    )

};

export default StatsEditor;