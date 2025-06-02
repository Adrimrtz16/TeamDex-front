import { useTheme } from "../../../../contexts/ThemeContext.jsx";
import mockTypes from "../../../../mocks/mockTypes.js";

const MiscellaneousEditor = ({setTeam, actualPokemon, shiny, setShiny, level, setLevel, teraType, setTeraType}) => {

    const { isDarkMode } = useTheme();

    const types = mockTypes.map(type => type.name);

    function levelChange(value) {
        value = Number(value);
        if (value < 1) value = 1;
        if (value > 100) value = 100;
        
        setLevel(value);
        setTeam(prevTeam => {
            const newTeam = [...prevTeam];
            newTeam[actualPokemon] = { ...newTeam[actualPokemon], level: value };
            return newTeam;
        });
    }

    function shinyChange(value) {
        setShiny(value);

        setTeam(prevTeam => {
            const newTeam = [...prevTeam];
            newTeam[actualPokemon] = { ...newTeam[actualPokemon], shiny: value };
            return newTeam;
        });
    }

    function teraTypeChange(value) {
        setTeraType(value);
        setTeam(prevTeam => {
            const newTeam = [...prevTeam];
            newTeam[actualPokemon] = { ...newTeam[actualPokemon], teraType: value };
            return newTeam;
        });
    }

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className={`my-2 rounded-lg shadow-md border-2 hover:shadow-lg transition p-3 text-center ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`}>
                        <div className="row">
                            <div className="col-12 flex justify-center items-center gap-4">
                                <div className="flex justify-center items-center ">
                                    <p className="mb-0 mr-3"><strong>Level:</strong> </p>
                                    <input className="border-1 pl-1" type="number" min={1} max={100} value={level} onChange={e => levelChange(e.target.value)}/>
                                </div>
                                <div className="flex justify-center items-center">
                                    <p className="mb-0 mr-3"><strong>Shiny:</strong> </p>
                                    <input type="checkbox" checked={shiny} onChange={e => shinyChange(e.target.checked)}/>
                                </div>
                                <div className="flex justify-center items-center">
                                    <p className="mb-0 mr-3"><strong>Tera Type: </strong></p>
                                    <select className={`border-1 pl-1 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} value={teraType} onChange={e => teraTypeChange(e.target.value)}>
                                        {types.map((type, index) => (
                                            <option key={index} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MiscellaneousEditor;