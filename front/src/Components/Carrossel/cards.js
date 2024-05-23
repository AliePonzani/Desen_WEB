import React, { useRef } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

export default function CarrosselCards({ dados, componente }) {
    const cardsRef = useRef(null);

    const handlePrevious = () => {
        if (cardsRef.current) {
            cardsRef.current.scrollBy({
                left: -cardsRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    };

    const handleNext = () => {
        if (cardsRef.current) {
            cardsRef.current.scrollBy({
                left: cardsRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="containerCards">
            <button className='buttonPrevious' onClick={handlePrevious}>
                <FaChevronCircleLeft />
            </button>

            <div className="cards" ref={cardsRef}>
                {Array.isArray(dados) && dados.length > 0 ? (
                    dados.map((card, key) => (
                        <div key={key}>
                            {React.createElement(componente, { teste: card })}
                        </div>
                    ))
                ) : (
                    <div className="vazio">Nenhum item cadastrado ainda!</div>
                )}
            </div>

            <button className='buttonNext' onClick={handleNext}>
                <FaChevronCircleRight />
            </button>
        </div>
    )
}
