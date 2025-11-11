import React, { useState } from 'react';
import './styles/Card.scss';

const Card = ({ info, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="card"
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="imageContainer">
                <img
                    src={info.imageName}
                    alt={info.name}
                    className="infoImage"
                />

                {isHovered && (
                    <div className="infoOverlay">
                        <div className="infoHover">
                            {info.technologies.map((tech, index) => (
                                <span key={index} className="techBadge small">{tech}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="info">
                <h4 className="infoName">{info.name}</h4>

                <div className="infoKeywords">
                    {info.keyWordDescri.slice(0, 3).map((mot, index) => (
                        <span key={index} className="keywordTag small">{mot}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Card;