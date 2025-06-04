import { getProfilePics } from "../../services/getProfilePics";

const PictureList = ({setProfilePic, setProfilePicView}) => {

    const profilePictures = getProfilePics();

    const handleSelectProfilePic = (url) => {
        setProfilePic(url);
        setProfilePicView(false);
    };

    return (
        <div className="col-12">
            <div className="mt-10">
                <div className="row">
                    {profilePictures.map((pic, index) => (
                        <div key={index} className="col-2 mb-4" onClick={() => handleSelectProfilePic(pic.url)}>
                            <img
                                className="cursor-pointer sprite w-100 rounded-lg border-3 bg-white border-gray-300"
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