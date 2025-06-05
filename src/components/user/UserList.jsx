import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import usePublicUsers from "../../hooks/usePublicUsers";
import Loader from "../loader/Loader";

const UserList = () => {

    const { isDarkMode } = useTheme();
    const cardClass = `cursor-pointer shadow-md m-2 rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`;
    const {users , buscandoUsers} = usePublicUsers();

    return (
        <div className="row">
            <div className="col-12">
                <h2 className="text-center !mt-10 !mb-6">Entrenadores socios de TeamDex</h2>
            </div>
            {buscandoUsers ? <Loader/> : 
                users.map((user) => (
                    <div className="col-3" key={user.id}>
                        <div className={cardClass}>
                            <Link to={`/users/user/${user.id}`} className="text-decoration-none text-dark">
                                <div className="row">
                                    <div className="col-4">
                                        <img className='sprite m-2' src={user.profilePictureUrl }/>
                                    </div>
                                    <div className="col-8">
                                        <h6 className="pt-2 mb-1">{user.username} ID: {user.id}</h6>
                                        <p className="mb-0">{user.bio}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                 ))
            }
        </div>
    );
}

export default UserList;