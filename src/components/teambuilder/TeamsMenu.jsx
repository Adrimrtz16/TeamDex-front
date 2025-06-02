import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const TeamsMenu = () => {

    const { isDarkMode } = useTheme();

    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <div className={`mt-20 mb-10 bg-gray-100 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`}>
                        <div className="row">
                            <div className="col-12">
                                <h1 className='text-center my-4'>Crea tu equipo o modifica uno ya existente</h1>
                                <Link className={`flex justify-center !no-underline ${isDarkMode ? 'text-white' : '!text-slate-800'}`} to='/teams/teambuilder'>
                                    <button className="px-6 py-2 mb-4 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                                        Nuevo equipo
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className={`mt-20 mb-10 bg-gray-100 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`}>
                        <div className="row">
                            <div className="col-12">
                                <h1 className='text-center my-4'>Tus equipos</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />   <br /><br /><br /><br /><br /><br />   <br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    );
}

export default TeamsMenu;