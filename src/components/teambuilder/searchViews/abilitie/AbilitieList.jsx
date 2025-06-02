import Ability from "./Abilitie";

const AbilityList = ({setTeam, actualPokemon, filteredAbilities, buscando, setSearch}) => {

    return (
        <>
            <div className="row">
                {buscando ? (
                    <p>Buscando...</p>
                ) : (
                    filteredAbilities.map((item, index) => (
                        <Ability
                            key={index}
                            name={item.name}
                            description={item.description}
                            setTeam={setTeam}
                            actualPokemon={actualPokemon}
                            setSearch={setSearch}
                        />
                    ))
                )}
            </div>
        </>
    )

};

export default AbilityList;