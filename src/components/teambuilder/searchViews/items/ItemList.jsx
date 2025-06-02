import Item from "./Item";

const ItemList = ({setTeam, actualPokemon, filteredItems, buscando, setSearch}) => {

    return (
        <>
            <div className="row">
                {buscando ? (
                    <p>Buscando...</p>
                ) : (
                    filteredItems.map((item, index) => (
                        <Item
                            key={index}
                            id={item.id}
                            name={item.name}
                            sprite={item.sprite}
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

export default ItemList;