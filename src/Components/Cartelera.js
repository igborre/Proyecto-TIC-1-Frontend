import React, { useState, useEffect } from 'react';
import "./Cartelera.css"

const Cartelera = () => {

    const [isOpen, setIsOpen] = useState(false); // Que se abra y cierre
    const [items, setItems] = useState([]); // Items en carlera (Se hace request al backend)
    const [error, setError] = useState(null); // Si la respuesta es un error

    const fetchCarteleraData = async () => {
        try { // Si no da error
            const response = await fetch(''); // Hay que poner a donde se hace request
            if (!response.ok) throw new Error('Could not fetch movies data'); // El error
            const data = await response.json(); // Se guarda el json, solo se necesita los nombres
            setItems(data); // Se guarda el json en data
            setIsOpen(true); // Si se tiene la data, se abre la lista
            setError(null); // Se resetea que no hay errores
        } catch (err) { // Si dio error
            console.error(err);
            setError('Failed to load items');
            setIsOpen(false);
        }
    };

    // Funcion para la hacer click al elemento, se abra la cartelera, o se cierre si esta abirto
    const handleCarteleraClick = () => {
        if (!isOpen) {
            fetchCarteleraData();
        } else {
            setIsOpen(false); // Close the list if it's already open
        }
    };

    // Si se hace click afuera, se cierra
    useEffect(() => {
        const handleCarteleraClickOutside = (event) => {
            if (isOpen) {
                setIsOpen(false);
            }
        };

        // Revisa si se hace click
        document.addEventListener('mousedown', handleCarteleraClickOutside);

        // Si se hace, cierra y deja de revisar
        return () => {
            document.removeEventListener('mousedown', handleCarteleraClickOutside);
        };
    })

    // Que va a hacer en la pagina
    return (
        <div className="Cartelera-Container">
            <button onClick={handleCarteleraClick}>Ver Cartelera</button>
            {/* Se llama a la funcion */}
            {isOpen && (
                <div className="scrollable-list"> {/* Los items van a una lista que se puede scrollear*/}
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <div key={index} className="list-item">
                                {item.name} {/* Por cada uno una fila, con su nombre*/}
                            </div>
                        ))
                    ) : (
                        <p>No te vas a creer lo que paso bro</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cartelera;
