import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import usePublicUsers from "../../hooks/usePublicUsers";
import Loader from "../loader/Loader";

const UserList = () => {

    const { isDarkMode } = useTheme();
    const cardClass = `cursor-pointer shadow-md m-2 rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-100'}`;
    const {users , buscandoUsers} = usePublicUsers();

    const linkClass = `!no-underline ${isDarkMode ? 'text-white' : '!text-slate-800'}`;
    const buttom = "mx-2 px-8 py-2 bg-red-500 text-white font-semibold !rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300";

    function handleSearchUser() {
        window.location.href = `/users/user/${document.querySelector('input[type="text"]').value}`;
    }

    return (
        <div className="row">
            <div className="col-12">
                <h2 className="text-center !mt-10 !mb-6">Entrenadores socios de TeamDex</h2>
                <div className="flex justify-center mb-4">
                    <input className="border-1 pl-2" type="text" placeholder="Busca usuario por ID"/>
                    <button className={buttom} onClick={handleSearchUser}>Buscar Usuario</button>
                </div>
            </div>
            {buscandoUsers ? <Loader/> : 
                users.map((user) => (
                    <div className="col-3" key={user.id}>
                        <div className={cardClass}>
                            <Link to={`/users/user/${user.id}`} className={linkClass}>
                                <div className="row">
                                    <div className="col-4">
                                        {user.profilePictureUrl
                                            ? <img className='sprite m-2' src={user.profilePictureUrl} />
                                            : <div className="sprite m-2 bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center">
                                                <span className="text-gray-500">?</span>
                                            </div>
                                        }
                                    </div>
                                    <div className="col-8">
                                        <h6 className="pt-2 mb-1">{user.username} ID: {user.id}</h6>
                                        <p className="mb-0">
                                        {user.bio && user.bio.length > 40
                                            ? user.bio.slice(0, 37) + '...'
                                            : user.bio}
                                        </p>
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