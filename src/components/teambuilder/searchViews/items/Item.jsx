import { useTheme } from "../../../../contexts/ThemeContext";

const Item = ({ id, name, sprite, description, setTeam, actualPokemon, setSearch }) => {

    const { isDarkMode } = useTheme();

    function seleccionarItem() {
        setSearch(3);
        setTeam(prevTeam => {
            const newTeam = [...prevTeam]; 
            newTeam[actualPokemon] = { ...newTeam[actualPokemon], 
                item: name}; 
            return newTeam;
        });
        
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Custom sprites and descriptions for specific items that are not in the PokeApi 

    const customItemSprites = {
        "throat-spray":   "https://images.wikidexcdn.net/mwuploads/wikidex/6/6e/latest/20240125203125/Espray_bucal.png",
        "heavy-duty-boots":   "https://images.wikidexcdn.net/mwuploads/wikidex/0/0e/latest/20240125200624/Botas_gruesas.png",
        "utility-umbrella":   "https://images.wikidexcdn.net/mwuploads/wikidex/3/38/latest/20240125205829/Parasol_multiuso.png",
        "clover-sweet":   "https://images.wikidexcdn.net/mwuploads/wikidex/4/4d/latest/20240125201726/Confite_trébol.png",
        "rusted-shield":   "https://images.wikidexcdn.net/mwuploads/wikidex/a/a6/latest/20240125203006/Escudo_oxidado.png",
        "rusted-sword":   "https://images.wikidexcdn.net/mwuploads/wikidex/0/02/latest/20240125203018/Espada_oxidada.png",
        "cracked-pot":   "https://images.wikidexcdn.net/mwuploads/wikidex/0/00/latest/20240125210942/Tetera_agrietada.png",
        "flower-sweet":   "https://images.wikidexcdn.net/mwuploads/wikidex/7/7a/latest/20240125202135/Confite_flor.png",
        "galarica-cuff":   "https://images.wikidexcdn.net/mwuploads/wikidex/9/99/latest/20240125200714/Brazal_galanuez.png",
        "galarica-wreath":   "https://images.wikidexcdn.net/mwuploads/wikidex/a/af/latest/20240125201753/Corona_galanuez.png",
        "eject-pack":   "https://images.wikidexcdn.net/mwuploads/wikidex/1/17/latest/20240125205619/Mochila_escape.png?20240125205619",
        "star-sweet":   "https://images.wikidexcdn.net/mwuploads/wikidex/3/36/latest/20240125201626/Confite_estrella.png?20240125201626",
        "strawberry-sweet":   "https://images.wikidexcdn.net/mwuploads/wikidex/a/a1/latest/20240125201641/Confite_fresa.png?20240125201641",
        "sweet-apple":   "https://images.wikidexcdn.net/mwuploads/wikidex/b/b4/latest/20240125205425/Manzana_dulce.png?20240125205425",
        "tart-apple":   "https://images.wikidexcdn.net/mwuploads/wikidex/7/75/latest/20240125205411/Manzana_%C3%A1cida.png?20240125205411",
        "room-service":   "https://images.wikidexcdn.net/mwuploads/wikidex/7/7b/latest/20240125210633/Servicio_raro.png?20240125210633",
        "chipped-pot":   "https://images.wikidexcdn.net/mwuploads/wikidex/4/44/latest/20240125210957/Tetera_rota.png?20240125210957",
        "love-sweet":   "https://images.wikidexcdn.net/mwuploads/wikidex/2/2a/latest/20240125201614/Confite_coraz%C3%B3n.png",
        "ribbon-sweet":   "https://images.wikidexcdn.net/mwuploads/wikidex/f/fe/latest/20240125201709/Confite_lazo.png?20240125201709",
        "loaded-dice":   "https://images.wikidexcdn.net/mwuploads/wikidex/8/8b/latest/20221213211136/Dado_trucado_EP.png",
        "ability-shield":   "https://images.wikidexcdn.net/mwuploads/wikidex/8/87/latest/20230122135448/Escudo_habilidad_EP.png",
        "booster-energy":   "https://images.wikidexcdn.net/mwuploads/wikidex/2/23/latest/20221219014602/Energ%C3%ADa_potenciadora_EP.png",
        "clear-amulet":   "https://images.wikidexcdn.net/mwuploads/wikidex/5/5c/latest/20230122134304/Amuleto_puro_EP.png",
        "covert-cloak":   "https://images.wikidexcdn.net/mwuploads/wikidex/1/11/latest/20221230202817/Capa_furtiva_EP.png",
        "fairy-feather":   "https://images.wikidexcdn.net/mwuploads/wikidex/d/d2/latest/20230914191008/Pluma_fe%C3%A9rica_EP.png",
        "mirror-herb":   "https://images.wikidexcdn.net/mwuploads/wikidex/8/84/latest/20221213205601/Hierba_copia_EP.png",
        "punching-glove":   "https://images.wikidexcdn.net/mwuploads/wikidex/2/20/latest/20230121233247/Guante_de_boxeo_EP.png",
        "adamant-crystal":   "https://images.wikidexcdn.net/mwuploads/wikidex/a/a9/latest/20230109223117/Gran_diamansfera_EP.png",
        "cornerstone-mask":   "https://images.wikidexcdn.net/mwuploads/wikidex/0/0c/latest/20230914211812/M%C3%A1scara_cimiento_EP.png",
        "griseous-core":   "https://images.wikidexcdn.net/mwuploads/wikidex/f/fe/latest/20230114140406/Gran_griseosfera_EP.png",
        "hearthflame-mask":   "https://images.wikidexcdn.net/mwuploads/wikidex/5/5d/latest/20230914211712/M%C3%A1scara_horno_EP.png",
        "lustrous-globe":   "https://images.wikidexcdn.net/mwuploads/wikidex/9/95/latest/20230110235115/Gran_lustresfera_EP.png",
        "wellspring-mask":   "https://images.wikidexcdn.net/mwuploads/wikidex/e/e9/latest/20230914211742/M%C3%A1scara_fuente_EP.png",
        "auspicious-armor":   "https://images.wikidexcdn.net/mwuploads/wikidex/f/ff/latest/20221119205839/Armadura_auspiciosa_EP.png",
        "malicious-armor":   "https://images.wikidexcdn.net/mwuploads/wikidex/9/9f/latest/20221119210321/Armadura_maldita_EP.png",
        "masterpiece-teacup":   "https://images.wikidexcdn.net/mwuploads/wikidex/2/2a/latest/20230914185019/Cuenco_exquisito_EP.png",
        "syrupy-apple":   "https://images.wikidexcdn.net/mwuploads/wikidex/6/69/latest/20230914184505/Manzana_melosa_EP.png",
        "unremarkable-teacup":   "https://images.wikidexcdn.net/mwuploads/wikidex/9/9c/latest/20230914184623/Cuenco_mediocre_EP.png",
        "blunder-policy":   "https://images.wikidexcdn.net/mwuploads/wikidex/0/00/latest/20240125210546/Seguro_fallo.png?20240125210546",
        "berry-sweet":   "https://images.wikidexcdn.net/mwuploads/wikidex/c/c7/latest/20240125201657/Confite_fruto.png?20240125201657",
    };

      const customItemDescriptions = {
        "loaded-dice": "All moves used by the holder become critical hits.",
        "ability-shield": "The holder's Ability cannot be changed by opponent moves.",
        "booster-energy": "Raises the holder's highest stat by one stage.",
        "clear-amulet": "Prevents its stat stages from being lowered.",
        "covert-cloak": "Protects the holder from additional effects of opponent moves.",
        "fairy-feather": "Prevents the holder's held item from being removed or negated.",
        "mirror-herb": "When a stat drop would occur, the holder copies the boost instead.",
        "punching-glove": "Punch-based moves used by the holder become critical hits.",
        "wellspring-mask":     "An item to be held by Ogerpon. This carved wooden mask is adorned with crystals and allows Ogerpon to wield the Water type during battle.",
        "adamant-crystal":     "An item to be held by Dialga. This large, glowing gem wells with power and allows the Pokémon to change form.",
        "cornerstone-mask":    "An item to be held by Ogerpon. This carved wooden mask is adorned with crystals and allows Ogerpon to wield the Rock type during battle.",
        "griseous-core":       "An item to be held by Giratina. This large, glowing gem wells with power and allows the Pokémon to change form.",
        "hearthflame-mask":    "An item to be held by Ogerpon. This carved wooden mask is adorned with crystals and allows Ogerpon to wield the Fire type during battle.",
        "lustrous-globe":      "An item to be held by Palkia. This large, glowing orb wells with power and allows the Pokémon to change form.",
        "malicious-armor":     "A peculiar set of armor that can make a certain species of Pokémon evolve. Malicious will lurk within it.",
        "masterpiece-teacup":  "A peculiar teacup that can make a certain species of Pokémon evolve. It may be chipped, but tea drunk from it is delicious.",
        "syrupy-apple":        "A peculiar apple that can make a certain species of Pokémon evolve. It's exceptionally syrupy.",
        "unremarkable-teacup": "A peculiar teacup that can make a certain species of Pokémon evolve. It may be cracked, but tea drunk from it is delicious." 
    };

    const text = customItemDescriptions[name] ?? description;

    const nameFormated = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

    return (
        <div className="col-md-4">
            <div onClick={seleccionarItem} className={`cursor-pointer my-2 rounded-lg shadow-md border-2 hover:shadow-lg transition p-2 text-center min-h-[188px] ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`}>
                <div className="row">
                    <div className="col-md-3">
                        <img src={customItemSprites[name] || sprite} alt={name} className="w-100 sprite" />
                    </div>
                    <div className="col-md-9">
                        <h5 className="">{nameFormated}</h5>
                        <p className="">{text}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;