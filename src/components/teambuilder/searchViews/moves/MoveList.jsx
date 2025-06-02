import Move from "./Move";
import fisico from "../../../../assets/fisico.png";
import especial from "../../../../assets/especial.png";
import estado from "../../../../assets/estado.png";

const MoveList = ({setTeam, actualPokemon, filteredMoves, buscando, moveIndex, setSearch, setMoveIndex, setMoveFilter}) => {

    function setSprite(move) {

        let sprite =
            move.category === "physical"
                ? fisico
                : move.category === "special"
                    ? especial
                    : estado;

        return sprite;

    }
    return (
        <>
            <div className="row">
                {buscando ? (
                    <p>Buscando...</p>
                ) : (
                    filteredMoves.map((move, index) => (
                        <Move
                            key={index}
                            name={move.name}
                            sprite={setSprite(move)}
                            typeId={move.typeId}
                            description={move.description}
                            accuracy={move.accuracy}
                            power={move.power}
                            pp={move.pp}
                            priority={move.priority}
                            setTeam={setTeam}
                            actualPokemon={actualPokemon}
                            moveIndex={moveIndex}
                            setSearch={setSearch}
                            setMoveIndex={setMoveIndex}
                            setMoveFilter={setMoveFilter}
                        />
                    ))
                )}
            </div>
        </>
    )

};

export default MoveList;