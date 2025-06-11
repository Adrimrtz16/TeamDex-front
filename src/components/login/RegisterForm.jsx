import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import PictureList from '../PictureList';
import { getRegister } from '../../services/auth/getRegister';

const RegisterForm = () => {

    const { isDarkMode } = useTheme();
    const [profilePicView, setProfilePicView] = useState(false);
    const [profilePic, setProfilePic] = useState();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Constantes de clases
    const inputClass = `w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-500 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white'}`;
    const labelClass = `block text-sm font-medium text-gray-700 mb-2 ${isDarkMode ? 'text-white' : ''}`;
    const formClass = `p-6 rounded shadow-md w-80 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`;
    const buttonClass = "w-full py-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300";

    async function handleRegister(e) {
        e.preventDefault();
        setError('');
        setSuccess(false);

        const form = e.target;
        const username = form.username.value.trim();
        const password = form.password.value;
        const email = form.email.value.trim();
        const profilePictureUrl = profilePic || '';

        if (!profilePictureUrl) {
            setError('Selecciona una imagen de perfil.');
            return;
        }

        const result = await getRegister(username, password, email, profilePictureUrl);

        if (result.success) {
            setSuccess(true);
            setError('');
            form.reset();
            setProfilePic('');
        } else {
            setError(result.message);
            setSuccess(false);
        }
    }

    // Para evitar el error de setProfilePic
    const handleSelectProfilePic = (url) => {
        setProfilePic(url);
        setProfilePicView(false);
    };

    return (
        <div className="row">
            <div className="col-md-12 flex flex-col items-center justify-center">
                <div className="mt-20">
                    <form className={formClass} onSubmit={handleRegister}>
                        <h1 className="text-3xl font-bold mb-4">Register</h1>
                        {error && <div className="mb-4 text-red-600">{error}</div>}
                        {success && <div className="mb-4 text-green-600">¡Registro completado! Ya puedes iniciar Sesión</div>}
                        <div className="mb-4">
                            <label className={labelClass} htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className={inputClass}
                                required
                                placeholder='Username'
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
                        <div className="mb-4">
                            <label className={labelClass} htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={inputClass}
                                required
                                placeholder='Email'
                                autoComplete="off"
                            />
                        </div>
                        <div className="mb-4">
                            <label className={labelClass} htmlFor="profilePic">Profile picture</label>
                            <input
                                type="profilePic"
                                id="profilePic"
                                name="profilePic"
                                className={inputClass}
                                required
                                readOnly
                                value={profilePic}
                                onClick={() => setProfilePicView(true)}
                                placeholder='Click here to select a profile pic'
                                autoComplete="off"
                            />
                        </div>
                        <button
                            type="submit"
                            className={buttonClass}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
            <div>
                {!profilePicView ? <></> :
                    <PictureList setProfilePic={handleSelectProfilePic} setProfilePicView={setProfilePicView}></PictureList>
                }
            </div>
        </div>
    );
}

export default RegisterForm;