import { useTheme } from "../../contexts/ThemeContext";
import addDark from '../../assets/addDark.png';
import addLight from '../../assets/addLight.png';

const PokemonSprite = ({sprite, id , setActualPokemon, setSearch, setExportText, setExportTextTeam, addImg}) => {

    const { isDarkMode } = useTheme();
    const pokemonImg = sprite === '' ? addImg : sprite;

    function changeSearch() {
        if (sprite === "") {
            setSearch(1); 
        } 
        setExportText(false);
        setExportTextTeam(false);
    }
    return (
        <img onClick={ () => {setActualPokemon(id); changeSearch()} } className={`cursor-pointer w-24 m-3 rounded-lg border-3 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} src={pokemonImg} alt="" />
    )
}

export default PokemonSprite;
