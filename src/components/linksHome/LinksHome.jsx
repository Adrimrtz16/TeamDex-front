import dragapult from '../../assets/887.png';
import lucario from '../../assets/448.png';
import aggron from '../../assets/306.png';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const LinksHome = () => {

    const { isDarkMode } = useTheme();

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className={`bg-gray-100 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`}>
                        <img className='p-5' src={dragapult} alt="" />
                        <div className='mx-20 pb-10'>
                            <h1>Teambuilder</h1>
                            <p className='my-3'>Construye equipos Pokémon estratégicos de forma sencilla y eficaz. Elige tus Pokémon, personaliza sus movimientos y estadísticas. Además, puedes exportar tu equipo a Pokémon Showdown. ¡Crea tu equipo ideal y domina el combate!</p>
                            <Link className={`!no-underline ${isDarkMode ? 'text-white' : '!text-slate-800'}`} to='/teams'>
                                <button className="px-6 py-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                                    Gestiona tus equipos
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className={`bg-gray-100 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`}>                        <img className='p-5' src={lucario} alt="" />
                        <div className='mx-20 pb-10'>
                            <h1>Trending</h1>
                            <p className='my-3'>Explora los equipos más populares del momento. Descubre las mejores combinaciones utilizadas por otros entrenadores, analiza estrategias y encuentra inspiración para mejorar tu propio equipo. ¡Sigue las tendencias y prepárate para la batalla!</p>

                            <button className="px-6 py-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                                Mira lo mas usado
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className={`bg-gray-100 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`}>                        <img className='p-5' src={aggron} alt="" />
                        <div className='mx-20 pb-10'>
                            <h1>Explora</h1>
                            <p className='my-3'>Sumérgete en un mundo de posibilidades. Busca y filtra equipos según tus preferencias, analiza datos en tiempo real y encuentra combinaciones únicas para optimizar tu juego. ¡Investiga, aprende y lleva tu estrategia al siguiente nivel!</p>

                            <button className="px-6 py-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                                Explora equipos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <br /><br />
                </div>
            </div>
        </div>
    );
}

export default LinksHome;