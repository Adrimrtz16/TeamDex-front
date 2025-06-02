import dark from '../../assets/dark.png';
import light from '../../assets/light.png';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const Header = () => {

    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className={`row bg-gray-100 shadow-md ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`}>
            <div className="col-12">
                <div className='flex justify-between items-center px-4'>
                    <Link className={`!no-underline ${isDarkMode ? 'text-white' : '!text-slate-800'}`} to=''>
                        <h1 className="text-4xl font-bold text-center py-4">
                            TeamDex
                        </h1>
                    </Link>
                    <div className='flex items-center'>
                        <button onClick={toggleTheme}>
                            <img className='w-[30px]' src={isDarkMode ? light : dark} alt="Toggle Theme" />
                        </button>
                        <button className={`text-4xl font-bold mx-2 px-8 py-2 text-center ${isDarkMode ? 'text-white' : ''} py-4`}>Inciar sesion</button>
                        <button className='mx-2 px-8 py-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300'>Registrarse</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Header;