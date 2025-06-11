import { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import useMe from "../../hooks/useMe";
import Loader from "../loader/Loader";
import { getUpdateBio } from "../../services/auth/getUpdateBio";

const Me = () => {

    const { isDarkMode } = useTheme();

    const token = localStorage.getItem('token');
    const {me, buscandoMe} = useMe(token);

    const [bio, setBio] = useState(me?.bio || "");

    useEffect(() => {
        if (me) {
            setBio(me.bio || "");
        }
    }, [me]);

    // Variables para clases reutilizables
    const cardClass = `p-10 mt-20 mb-10 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`;
    const imgClass = `sprite w-100 rounded-lg border-3 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`;
    const titleClass = "text-3xl font-bold mb-2";
    const textClass = `text-lg border-2 rounded-sm mb-4 p-2 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`;
    const buttonClass = "px-8 py-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300";

    function updateBio() {
        getUpdateBio(me.id, bio, token)

    }

    return (
        token === null ? <h1 className="text-center !mt-20">No estás autenticado, inicia sesión.</h1> :
        me === null ? <Loader /> :
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className={cardClass}>
                        <div className="row">
                            <div className="col-md-3">
                                <img className={imgClass} src={me.profilePictureUrl} alt="" />
                                <div className="flex justify-center mt-4">
                                    <button onClick={updateBio} className={buttonClass}>Actualizar bio</button>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <h1 className={titleClass}>{me.username} <span className="font-light">ID: {me.id}</span></h1>
                                <textarea className={`${textClass} w-100`}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Escribe tu biografía aquí..."
                                    rows="12"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Me;