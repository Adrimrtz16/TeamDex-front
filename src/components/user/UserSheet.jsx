import { useTheme } from "../../contexts/ThemeContext";

const UserSheet = () => {

    const { isDarkMode } = useTheme();

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className={`p-10 mt-20 mb-10 bg-gray-100 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`}>
                        <div className="row">
                            <div className="col-3">
                                <img className={`sprite w-100 rounded-lg border-3 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`} src={"https://adrimrtz16.github.io/profilePics/images/carmine.png"} alt="" />
                            </div>
                            <div className="col-9">
                                <h1 className="text-3xl font-bold mb-2">Carmine <span className="font-light">ID: 1</span></h1>
                                <p className="text-lg mb-4">¡Hola! Soy Carmine, una apasionada entrenadora Pokémon. Me encanta explorar el mundo de los Pokémon y compartir estrategias con otros entrenadores.</p>
                                <p className="text-md mb-2">⚡ Pokémon Favorito: Sinistcha</p>
                                <p className="text-md mb-2">💬 Contacto: @carmine_noroteo (twitter)</p>
                                <p className="text-md mb-2">📅 Fecha de Registro: 2023-10-01</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h2 className="text-2xl font-semibold text-center mt-4">Carmine's Teams</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserSheet;