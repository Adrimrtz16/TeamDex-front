import { useState } from 'react';
import { getLogin } from '../../services/auth/getLogin';
import { useTheme } from '../../contexts/ThemeContext';
import { getUser } from '../../services/auth/getUser';

const LoginForm = () => {

    const { isDarkMode } = useTheme();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Constantes de clases
    const inputClass = `w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white'}`;
    const labelClass = `block text-sm font-medium text-gray-700 mb-2 ${isDarkMode ? 'text-white' : ''}`;
    const formClass = `p-6 rounded shadow-md w-80 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`;
    const buttonClass = "w-full py-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300";

    async function handleLogin(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        const result = await getLogin(username, password);

        if (result.success) {
            setSuccess(true);
            setError('');
            window.location.href = '/';
        } else {
            setError(result.message);
            setSuccess(false);
        }
    }

    return (
        <div className="row">
            <div className="col-12 flex flex-col items-center justify-center">
                <div className="mt-20">
                    <form className={formClass} onSubmit={handleLogin}>
                        <h1 className="text-3xl font-bold mb-4">Log In</h1>
                        {error && <div className="mb-4 text-red-600">{error}</div>}
                        {success && <div className="mb-4 text-green-600">¡Login correcto!</div>}
                        <div className="mb-4">
                            <label className={labelClass} htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className={inputClass}
                                required
                                placeholder='Usuname'
                                autoComplete="off"
                            />
                        </div>
                        <div className="mb-4">
                            <label className={labelClass} htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={inputClass}
                                required
                                placeholder='Password'
                                autoComplete="off"
                            />
                        </div>
                        <button
                            type="submit"
                            className={buttonClass}
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;