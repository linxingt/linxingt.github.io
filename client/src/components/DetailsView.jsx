import React from 'react';
import { ProgressBar } from './ProgressBar';
import './styles/DetailsView.scss';

const SkillContent = ({ details }) => (
    <>
        {details.groups.map((group, groupIndex) => (
            <div key={groupIndex} className="skillGroup">
                <h5 className="groupTitle">{group.groupName}</h5>
                <div className="skillsList">
                    {group.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="skillItem">
                            <div className="skillInfo">
                                <span>{skill.name}</span>
                                {skill.progress && <span className="skillPercentage small">{skill.progress}%</span>}
                            </div>
                            {skill.progress && <ProgressBar progress={skill.progress} delay={groupIndex * 0.1 + skillIndex * 0.05} />}
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </>
);

const ProjectContent = ({ details }) => (
    <div className="projectDetailsContent">
        <div className="projectInfo">
            <p className="projectYear">Année: {details.year}</p>

            <div className="detailSection">
                <h5>Technologies Utilisées</h5>
                <div className="techTags">
                    {details.technologies.map((tech, index) => (
                        <span key={index} className="techTag small">{tech}</span>
                    ))}
                </div>
            </div>

            <div className="detailSection">
                <h5>Mots-clés</h5>
                <div className="keywordsTags">
                    {details.keyWordDescri.map((keyword, index) => (
                        <span key={index} className="keywordTag small">{keyword}</span>
                    ))}
                </div>
            </div>

            <div className="detailSection">
                <h5>Résumé du projet</h5>
                <p>{details.resume}</p>
            </div>

            <div className="detailSection">
                <h5>Ma Contribution Personnelle</h5>
                <p>{details.persoContribu}</p>
            </div>

            {details.lien && (
                <div className="detailSection">
                    <h5>Lien du Projet / GitHub</h5>
                    <a href={details.lien} target="_blank" rel="noopener noreferrer" className="detailLink">
                        Accéder au Projet / Dépôt
                    </a>
                </div>
            )}
        </div>
    </div>
);

export const DetailsView = ({ details, type, categoryName, onClose, isMobileDetailsOpen = true }) => {
    if (!details) return null;

    const title = type === 'project' ? details.name : categoryName;


    const isFullscreen = type === 'project' || (isMobileDetailsOpen && type === 'skill');
    const modalClass = isFullscreen ? 'fullscreenModal' : 'mobileOverlay';

    return (
        <div className={`DetailsView  ${modalClass}`}>

            {isFullscreen && (
                <div className="modalOverlay" onClick={onClose}></div>
            )}

            <div className={`modalContainer type-${type}`}>
                <div className="modalHeader">
                    <h3 className="modalTitle">{title}</h3>
                    {(type === 'project' || isMobileDetailsOpen) && (
                        <button className="modalCloseButton" onClick={onClose}>
                            ×
                        </button>
                    )}
                </div>

                <div className="modalContent">
                    {type === 'skill' ? (
                        <SkillContent details={details} />
                    ) : type === 'project' ? (
                        <ProjectContent details={details} />
                    ) : (
                        <p>Type de contenu non supporté.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailsView;