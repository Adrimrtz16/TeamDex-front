import pokeBall from '../../assets/pokeball.webp';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import dragapult from '../../assets/887.png';
import lucario from '../../assets/448.png';
import aggron from '../../assets/306.png';

const HomeBody = () => {

    const { isDarkMode } = useTheme();

    // Constantes de clases
    const cardClass = `bg-gray-100 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`;
    const buttonClass = "px-6 py-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300";
    const linkClass = `!no-underline ${isDarkMode ? 'text-white' : '!text-slate-800'}`;

    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <div className={`mt-20 mb-10 ${cardClass}`}>
                        <div className="row">
                            <div className="col-4">
                                <img className='m-5' src={pokeBall} alt="" />
                            </div>
                            <div className="col-8">
                                <div className='m-20'>
                                    <h1>Bienvenido a TeamDex</h1>
                                    <p>Descubre, crea y comparte tus equipos Pokémon con facilidad. TeamDex te permite construir equipos estratégicos utilizando datos en tiempo real de la <strong>PokeAPI</strong> y exportarlos para <strong>Pokémon Showdown</strong>.</p>

                                    <ul>
                                        <li>🌟 Crea tu equipo ideal con estadísticas detalladas.</li>
                                        <li>🔥 Explora los equipos más populares en la sección Trending.</li>
                                        <li>⚡ Comparte estrategias con otros entrenadores.</li>
                                    </ul>
                                
                                    <p>¡Empieza ahora y lleva tu juego al siguiente nivel! 🚀</p>

                                    <button className={buttonClass}>
                                        Comenzar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className={cardClass}>
                        <img className='p-5' src={dragapult} alt="" />
                        <div className='mx-20 pb-10'>
                            <h1>Teambuilder</h1>
                            <p className='my-3'>Construye equipos Pokémon estratégicos de forma sencilla y eficaz. Elige tus Pokémon, personaliza sus movimientos y estadísticas. Además, puedes exportar tu equipo a Pokémon Showdown. ¡Crea tu equipo ideal y domina el combate!</p>
                            <Link className={linkClass} to='/teams'>
                                <button className={buttonClass}>
                                    Gestiona tus equipos
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className={cardClass}>
                        <img className='p-5' src={lucario} alt="" />
                        <div className='mx-20 pb-10'>
                            <h1>Trending</h1>
                            <p className='my-3'>Explora los equipos más populares del momento. Descubre las mejores combinaciones utilizadas por otros entrenadores, analiza estrategias y encuentra inspiración para mejorar tu propio equipo. ¡Sigue las tendencias y prepárate para la batalla!</p>
                            <button className={buttonClass}>
                                Mira lo mas usado
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className={cardClass}>
                        <img className='p-5' src={aggron} alt="" />
                        <div className='mx-20 pb-10'>
                            <h1>Explora</h1>
                            <p className='my-3'>Sumérgete en un mundo de posibilidades. Busca y filtra equipos según tus preferencias, analiza datos en tiempo real y encuentra combinaciones únicas para optimizar tu juego. ¡Investiga, aprende y lleva tu estrategia al siguiente nivel!</p>
                            <button className={buttonClass}>
                                Explora usuarios
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
    )
}

export default HomeBody;