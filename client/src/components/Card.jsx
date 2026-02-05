import { useState } from 'react';
import { motion } from "motion/react";
import { useWindowSize } from '../hooks/useWindowSize';
import './styles/Card.scss';

const Card = ({ info, onClick, isActive = false, type }) => {
    const { isMobile } = useWindowSize();
    const [isHovered, setIsHovered] = useState(false);
    const displayList =
        type === 'project'
            ? info.keyWordDescri
            : type === 'experience'
                ? info.toolUsed
                : [];

    const tagsToDisplay = Array.isArray(displayList) ? displayList : [];

    const Overlay = () => (
        <div className="cardInfoOverlay">
            <div className="techBadges">
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
                <div className="expImageContainer">
                    <img
                        src={info.imageName}
                        alt={info.name}
                        className="cardInfoImage expInfoImage"
                    />
                </div>

                <div className="expDetails">
                    <h5 className="cardInfoName expName">{info.name}</h5>
                    <p className="expCompany">{info.company}</p>
                </div>
                <span className="expPeriode small">{info.periode}</span>
            </div>

            <div className="cardInfoKeywords expKeywords">
                {tagsToDisplay.map((mot, index) => (
                    <span key={index} className="keywordTag small">{mot}</span>
                ))}
            </div>
        </div>
    );


    const renderProjectCard = () => (
        <>
            <div className="projImageContainer">
                <img
                    src={info.imageName}
                    alt={info.name}
                    className="cardInfoImage"
                />
                {isHovered && <Overlay />}
            </div>

            <div className="infoProj">
                <h5 className="cardInfoName">{info.name}</h5>
                <div className="cardInfoKeywords">
                    {tagsToDisplay.map((mot, index) => (
                        <span key={index} className="keywordTag small">{mot}</span>
                    ))}
                </div>
            </div>
        </>
    );

    return (
        <motion.div
            className={`card ${isActive ? 'active' : ''} ${type === 'experience' ? 'cardExperience' : 'cardProject'}`}
            onClick={onClick}
            onMouseEnter={() => { setIsHovered(true); (type === 'experience' && !isMobile) ? onClick() : undefined; }}
            onMouseLeave={() => setIsHovered(false)}
            whileTap={{ scale: 0.8 }}
            initial={{ opacity: 0.8, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5}}
        >
            {type === 'experience' ? renderExperienceCard() : renderProjectCard()}
        </motion.div>
    );
};

export default Card;