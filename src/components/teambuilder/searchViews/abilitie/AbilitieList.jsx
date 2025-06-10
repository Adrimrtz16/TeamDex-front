import Ability from "./Abilitie";

const AbilityList = ({setTeam, actualPokemon, filteredAbilities, buscando, setSearch}) => {

    return (
        <>
            <div className="row">
                {buscando ? (
                    <p>Buscando...</p>
                ) : (
                    filteredAbilities.map((abilitie, index) => (
                        <Ability
                            key={index}
                            name={abilitie.name}
                            description={abilitie.description}
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