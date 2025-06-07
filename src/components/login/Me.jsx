import { useTheme } from "../../contexts/ThemeContext";
import { getMe } from "../../services/auth/getMe";
import Loader from "../loader/Loader";
import { useEffect, useState } from "react";

const Me = () => {

    const { isDarkMode } = useTheme();

    const token = localStorage.getItem('token');
    const {me, buscandoMe} = useMe(token);

    // Variables para clases reutilizables
    const cardClass = `p-10 mt-20 mb-10 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`;
    const imgClass = `sprite w-100 rounded-lg border-3 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`;
    const titleClass = "text-3xl font-bold mb-2";
    const subtitleClass = "text-2xl font-semibold text-center mt-4";
    const textClass = "text-lg mb-4";

    return (
        token === null ? <h1 className="text-center !mt-20">No estás autenticado, inicia sesión.</h1> :
        me === null ? <Loader /> :
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className={cardClass}>
                        <div className="row">
                            <div className="col-3">
                                <img className={imgClass} src={me.profilePictureUrl} alt="" />
                            </div>
                            <div className="col-9">
                                <h1 className={titleClass}>{me.username} <span className="font-light">ID: {me.id}</span></h1>
                                <p className={textClass}>{me.bio}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h2 className={subtitleClass}>{me.username}'s Teams</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Me;