import { useTheme } from "../../../../contexts/ThemeContext";

const Item = ({ id, name, sprite, description, setTeam, actualPokemon, setSearch }) => {

    const { isDarkMode } = useTheme();

    function seleccionarItem() {
        setSearch(3);
        setTeam(prevTeam => {
            const newTeam = [...prevTeam]; 
            newTeam[actualPokemon] = { ...newTeam[actualPokemon], 
                item: name}; 
            return newTeam;
        });
        
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const nameFormated = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

    return (
        <div className="col-4">
            <div onClick={seleccionarItem} className={`cursor-pointer my-2 rounded-lg shadow-md border-2 hover:shadow-lg transition p-2 text-center min-h-[188px] ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`}>
                <div className="row">
                    <div className="col-3">
                        <img src={sprite} alt={name} className="w-100 sprite" />
                    </div>
                    <div className="col-9">
                        <h5 className="">{nameFormated}</h5>
                        <p className="">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;