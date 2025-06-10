import { useLocation } from "react-router-dom";
import TeamBuilderMenu from "../components/teambuilder/TeamBuilderMenu";

const TeamBuilder = () => {

    const location = useLocation();
    const team = location.state?.team;

    return (
        <>
            <TeamBuilderMenu importedTeam={team}/>
        </>
    );
}

export default TeamBuilder;