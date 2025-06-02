import { useTheme } from "../../../contexts/ThemeContext";


const FiltroNombre = ({setNameFilter}) => {

    const { isDarkMode } = useTheme();

    function filterByName(e) {
        setNameFilter(e.target.value);
    }

    return (
        <div className="pt-[40px] pb-[20px]">
            <div className="row">
                <div className="col-12">
                    <label className="mr-3">name: </label>
                    <input className={`shadow-md border-1 rounded-[20px] pl-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} type="text" onChange={filterByName}></input>
                </div>
            </div>
        </div>
    )
}

export default FiltroNombre;