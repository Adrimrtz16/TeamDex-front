import { useTheme } from "../../contexts/ThemeContext";
import addDark from '../../assets/addDark.png';
import addLight from '../../assets/addLight.png';

const TeamBuilderTeam = ({ team }) => {

    const { isDarkMode } = useTheme();

    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <div className={`mt-20 mb-10 bg-gray-100 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950' : 'bg-gray-100'}`}>
                        <div className="row">
                            <div className="col-12">
                                <h1 className='text-center my-4'>Nombre del equipo</h1>
                            </div>
                            <div className="col-12 flex flex-wrap justify-center">
                                <img className={`w-1/4 p-2 m-4 rounded-lg border-3 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} src={`${isDarkMode ? addDark : addLight}`} alt="" />
                                <img className={`w-1/4 p-2 m-4 rounded-lg border-3 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} src={`${isDarkMode ? addDark : addLight}`} alt="" />
                                <img className={`w-1/4 p-2 m-4 rounded-lg border-3 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} src={`${isDarkMode ? addDark : addLight}`} alt="" />
                                <img className={`w-1/4 p-2 m-4 rounded-lg border-3 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} src={`${isDarkMode ? addDark : addLight}`} alt="" />
                                <img className={`w-1/4 p-2 m-4 rounded-lg border-3 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} src={`${isDarkMode ? addDark : addLight}`} alt="" />
                                <img className={`w-1/4 p-2 m-4 rounded-lg border-3 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} src={`${isDarkMode ? addDark : addLight}`} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamBuilderTeam;