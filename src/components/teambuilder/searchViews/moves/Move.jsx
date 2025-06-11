import { useTheme } from "../../../../contexts/ThemeContext";

const Move = ({ name, description, sprite, typeId, accuracy, power, pp, priority, setTeam, actualPokemon, moveIndex, setSearch, setMoveIndex, setMoveFilter}) => {

    const { isDarkMode } = useTheme();
    const type = `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-viii/sword-shield/${typeId}.png`

    function selectMove() {
        setTeam(prevTeam => {
            const newTeam = [...prevTeam];
            const newMoves = [...newTeam[actualPokemon].moves];
            newMoves[moveIndex] = name;
            newTeam[actualPokemon] = { ...newTeam[actualPokemon], moves: newMoves };
            return newTeam;
        });
        
        setMoveIndex(moveIndex = moveIndex + 1);
        if (moveIndex >= 4) {
            setSearch(5);
            setMoveIndex(0)
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        setMoveFilter("");
    }

    const forbiddenPPUp = ["sketch", "life-dew"];
    const basePP = Number(pp) || 0;

    const maxPP =
        forbiddenPPUp.includes(name.toLowerCase())
            ? basePP
            : basePP + 3 * Math.floor(basePP * 0.2);

    const nameFormated = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

    return (
        <div className="col-md-4">
            <div onClick={selectMove} className={`cursor-pointer my-2 rounded-lg shadow-md border-2 hover:shadow-lg transition p-2 text-center min-h-[180px] ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`}>
                <div className="row">
                    <div className="col-md-12 flex justify-between items-center">
                        <img src={sprite} alt="" />
                        <img className="w-[90px]" src={type} alt="" />
                        <p className="mb-0">PP: 
                            {basePP > 0
                                ? `${basePP} / ${maxPP}`
                                : "-"}
                        </p>
                        <p className="text-sm mb-0">Priority: {priority}</p>
                    </div>
                    <div className="col-md-12 flex justify-center items-center gap-2">
                        <h5 className="pt-2 mb-1">{nameFormated}</h5>
                        <p className="pt-2 mb-0 text-sm">Power: {power}</p>
                        <p className="pt-2 mb-0 text-sm">Accuracy: {accuracy}</p>
                    </div>
                    <div className="col-md-12">
                        <p className="">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Move;