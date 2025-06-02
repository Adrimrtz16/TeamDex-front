import { useState, useEffect } from 'react';
import { getItems } from '../services/getItems';

const useItems = () => {
    const [items, setItems] = useState();
    const [buscando, setBuscando] = useState(true);
    
    function obtenerItems() {
        setBuscando(true);
        setItems(getItems());
        setBuscando(false); 
    }

    useEffect(obtenerItems, []);
    return { items, buscando };
};

export default useItems;