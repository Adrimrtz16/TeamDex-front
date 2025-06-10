import { useTheme } from "../../contexts/ThemeContext";
import { getProfilePics } from "../../services/getProfilePics";

const PictureList = ({setProfilePic, setProfilePicView}) => {

    const { isDarkMode } = useTheme();

    const profilePictures = getProfilePics();

    const handleSelectProfilePic = (url) => {
        setProfilePic(url);
        setProfilePicView(false);
    };

    const cardClass = `cursor-pointer border-3 shadow-sm w-100 sprite rounded-[20px] ${isDarkMode ? 'bg-slate-950 text-white border-slate-800' : 'bg-white border-gray-300'}`;


    return (
        <div className="col-12">
            <div className="mt-10">
                <div className="row">
                    {profilePictures.map((pic, index) => (
                        <div key={index} className="col-2 mb-4" onFocus={() => handleSelectProfilePic(pic.url)} onClick={() => handleSelectProfilePic(pic.url)}>
                            <img
                                className={cardClass}
                                src={pic.url}
                                alt={pic.name}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PictureList;