import React, { useState } from 'react';
import './styles/Card.scss';

const Card = ({ info, onClick, isActive = false, type }) => {
    const [isHovered, setIsHovered] = useState(false);
    const displayList =
        type === 'project'
            ? info.keyWordDescri
            : type === 'experience'
                ? info.toolUsed
                : [];

    const tagsToDisplay = Array.isArray(displayList) ? displayList : [];

    const Overlay = () => (
        <div className="infoOverlay">
            <div className="infoHover">
                {info.technologies && info.technologies.map((tech, index) => (
                    <span key={index} className="techBadge small">{tech}</span>
                ))}
            </div>
        </div>
    );


    const renderExperienceCard = () => (
        <div className="infoExp">
            {isHovered && <Overlay />}
            <div className="expHeader">
                <div className="imageContainer expImageContainer">
                    <img
                        src={info.imageName}
                        alt={info.name}
                        className="infoImage expInfoImage"
                    />
                </div>

                <div className="expDetails">
                    <h5 className="infoName expName">{info.name}</h5>
                    <p className="expCompany">{info.company}</p>
                </div>
                <span className="expPeriode small">{info.periode}</span>
            </div>

            <div className="infoKeywords expKeywords">
                {tagsToDisplay.map((mot, index) => (
                    <span key={index} className="keywordTag small">{mot}</span>
                ))}
            </div>
        </div>
    );


    const renderProjectCard = () => (
        <>
            <div className="imageContainer">
                <img
                    src={info.imageName}
                    alt={info.name}
                    className="infoImage"
                />
                {isHovered && <Overlay />}
            </div>

            <div className="info">
                <h5 className="infoName">{info.name}</h5>
                <div className="infoKeywords">
                    {tagsToDisplay.map((mot, index) => (
                        <span key={index} className="keywordTag small">{mot}</span>
                    ))}
                </div>
            </div>
        </>
    );

    return (
        <div
            className={`card ${isActive ? 'active' : ''} ${type === 'experience' ? 'cardExperience' : 'cardProject'}`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {type === 'experience' ? renderExperienceCard() : renderProjectCard()}
        </div>
    );
};

export default Card;