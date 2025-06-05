import { useParams } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import useUserWithTeams from "../../hooks/useUserWithTeams";
import Loader from "../loader/Loader";

const UserSheet = () => {

    const { isDarkMode } = useTheme();
    const { id } = useParams();
    const {user, buscandoUser} = useUserWithTeams(id);

    // Variables para clases reutilizables
    const cardClass = `p-10 mt-20 mb-10 shadow-md rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`;
    const imgClass = `sprite w-100 rounded-lg border-3 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`;
    const titleClass = "text-3xl font-bold mb-2";
    const subtitleClass = "text-2xl font-semibold text-center mt-4";
    const textClass = "text-lg mb-4";

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className={cardClass}>
                        { buscandoUser ? <Loader /> :  
                            <>
                                <div className="row">
                                    <div className="col-3">
                                        <img className={imgClass} src={user.profilePictureUrl} alt="" />
                                    </div>
                                    <div className="col-9">
                                        <h1 className={titleClass}>{user.username} <span className="font-light">ID: {user.id}</span></h1>
                                        <p className={textClass}>{user.bio}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <h2 className={subtitleClass}>{user.username}'s Teams</h2>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserSheet;