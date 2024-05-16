import React, { useEffect, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

export default function CarrosselCars(params) {
    const [startIndex, setStartIndex] = useState(0);
    const handleNext = () => {
        setStartIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevious = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    useEffect(() => {
        setStartIndex(0);
    }, [params.dados]);

    return (
        <div className="containerCards">
            <button className='buttonPrevious' onClick={handlePrevious} disabled={startIndex === 0}> <FaChevronCircleLeft /> </button>
            <div className="cards">
                {Object.entries(params.dados).slice(startIndex, startIndex + 3).map(([key, value]) => (
                    <div key={key}>
                        {React.createElement(params.componente, { teste: value })}
                    </div>
                ))}
            </div>
            <button className='buttonNext' onClick={handleNext} disabled={startIndex === (params.dados).length - 3 || (params.dados).length < 3}> <FaChevronCircleRight /> </button>
        </div>
    )
}