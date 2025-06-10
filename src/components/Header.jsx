import { useEffect, useRef, useState } from 'react';
import dark from '../assets/dark.png';
import light from '../assets/light.png';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { getMe } from '../services/auth/getMe';
import useMe from '../hooks/useMe';

const Header = () => {

    const { isDarkMode, toggleTheme } = useTheme();

    // Constantes de clases
    const headerClass = `row bg-gray-100 shadow-md ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`;
    const linkClass = `!no-underline ${isDarkMode ? 'text-white' : '!text-slate-800'}`;
    const loginButtonClass = `text-4xl font-bold mx-2 px-8 py-2 text-center ${isDarkMode ? 'text-white' : ''} py-4`;
    const registerButtonClass = "mx-2 px-8 py-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300";

    const token = localStorage.getItem('token');
    const {me, buscandoMe} = useMe(token);


    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    // Cierra el menú si haces click fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={headerClass}>
            <div className="col-12">
                <div className='flex justify-between items-center px-4'>
                    <Link className={linkClass} to='/'>
                        <h1 className="text-4xl font-bold text-center py-4">
                            TeamDex
                        </h1>
                    </Link>
                    <div className='flex items-center'>
                        <button onClick={toggleTheme}>
                            <img className='w-[30px]' src={isDarkMode ? light : dark} alt="Toggle Theme" />
                        </button>

                        {!token ? 
                            <>
                                <Link to='/login' className={linkClass}>
                                    <button className={loginButtonClass}>Inciar sesion</button>
                                </Link>
                                <Link to='/register' className={linkClass}>
                                    <button className={registerButtonClass}>Registrarse</button>
                                </Link>
                            </>
                        :
                            
                            <div onClick={() => setMenuOpen((open) => !open)} ref={menuRef} className='cursor-pointer flex items-center'>
                                {me ? (
                                    <>
                                        <p className='mb-0 mx-4 font-semibold'>{me.username}</p>
                                        <img
                                            src={me.profilePictureUrl}
                                            alt={me.username}
                                            className="w-10 h-10 ml-2"
                                        />
                                        {menuOpen && (
                                            <div className="absolute right-8 top-19 shadow-lg z-50 min-w-[150px]">
                                                <Link className={linkClass} to={`/me`}>
                                                    <p className={`px-4 mb-0 pt-2 cursor-pointer ${isDarkMode ? 'bg-slate-900 hover:underline text-white' : 'bg-white hover:bg-gray-300 hover:underline'}`}>
                                                        Mi perfil
                                                    </p>
                                                </Link>
                                                    <p className={`px-4 mb-0 py-2 cursor-pointer ${isDarkMode ? 'bg-slate-900 hover:underline text-white' : 'bg-white hover:bg-gray-300 hover:underline'}`} onClick={() => {
                                                        localStorage.removeItem('token');
                                                        window.location.reload();
                                                    }}>
                                                        Cerrar sesión
                                                    </p>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <span className="ml-2">Cargando...</span>
                                )}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Header;