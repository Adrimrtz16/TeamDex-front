import pokeBall from '../assets/pokeball.webp';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import dragapult from '../assets/887.webp';
import lucario from '../assets/448.webp';
import aggron from '../assets/306.webp';

const HomeBody = () => {

    const { isDarkMode } = useTheme();

    const token = localStorage.getItem('token');

    // Constantes de clases
    const cardClass = `mt-10 bg-gray-100 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`;
    const buttonClass = "px-6 py-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300";
    const linkClass = `!no-underline ${isDarkMode ? 'text-white' : '!text-slate-800'}`;

    return (
        <div className='container'>
            {!token ? 
            <div className="row">
                <div className="col-md-12 d-md-block d-none">
                    <div className={`${cardClass}`}>
                        <div className="row">
                            <div className="col-md-4">
                                <img className='m-5' src={pokeBall} alt="" />
                            </div>
                            <div className="col-md-8">
                                <div className='m-20'>
                                    <h1>Bienvenido a TeamDex</h1>
                                    <p>Descubre, crea y comparte tus equipos Pokémon con facilidad. TeamDex te permite construir equipos estratégicos utilizando datos en tiempo real de la <strong>PokeAPI</strong> y exportarlos para <strong>Pokémon Showdown</strong>.</p>

                                    <ul>
                                        <li>🌟 Crea tu equipo ideal con estadísticas detalladas.</li>
                                        <li>🔥 Explora los equipos más populares en la sección Trending.</li>
                                        <li>⚡ Comparte estrategias con otros entrenadores.</li>
                                    </ul>
                                
                                    <p>¡Empieza ahora y lleva tu juego al siguiente nivel! 🚀</p>
                                    <Link to={'/register'} className={linkClass}>
                                        <button className={buttonClass}>
                                            Comenzar
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <></>
        }
            <div className="row">
                <div className="col-md-4 col-12">
                    <div className={cardClass}>
                        <img className='p-5' src={dragapult} alt="" />
                        <div className='mx-20 pb-10'>
                            <h1>Teambuilder</h1>
                            <p className='my-3'>Construye equipos Pokémon de forma sencilla y eficaz. Elige tus Pokémon, personaliza sus movimientos y estadísticas. Además, puedes exportar tu equipo a Pokémon Showdown.</p>
                            <Link className={linkClass} to='/teams'>
                                <button className={buttonClass}>
                                    Gestiona tus equipos
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-12">
                    <div className={cardClass}>
                        <img className='p-5' src={lucario} alt="" />
                        <div className='mx-20 pb-10'>
                            <h1>Equipos</h1>
                            <p className='my-3'>Explora los equipos más populares del momento. Descubre las mejores combinaciones utilizadas por otros entrenadores, analiza estrategias y encuentra inspiración para mejorar tu propio equipo.</p>
                            <Link className={linkClass} to='/teams/explorer'>
                                <button className={buttonClass}>
                                    Mira lo mas usado
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-12">
                    <div className={cardClass}>
                        <img className='p-5' src={aggron} alt="" />
                        <div className='mx-20 pb-10'>
                            <h1>Usuarios</h1>
                            <p className='my-3'>Descubre a otros entrenadores Pokémon de la comunidad. Explora perfiles, consulta sus equipos, comparte estrategias y encuentra inspiración para mejorar tu juego tanto en Singles como de VGC.</p>
                            <Link className={linkClass} to='/users'>
                                <button className={buttonClass}>Explora usuarios</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <br /><br />
                </div>
            </div>
        </div>
    )
}

export default HomeBody;