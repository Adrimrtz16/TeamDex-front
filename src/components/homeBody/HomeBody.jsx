import pokeBall from '../../assets/pokeball.webp';
import { useTheme } from '../../contexts/ThemeContext';

const HomeBody = () => {

    const { isDarkMode } = useTheme();

    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <div className={`mt-20 mb-10 bg-gray-100 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`}>
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

                                    <button className="px-6 py-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                                        Comenzar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeBody;