import React from 'react';
import { ProgressBar } from './ProgressBar';
import './styles/DetailsView.scss'; // Contient les styles communs de la modale

// ------------------------------------------------
// Composant interne pour l'affichage des Skills
// ------------------------------------------------
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

// ------------------------------------------------
// Composant interne pour l'affichage des Projets
// ------------------------------------------------
const ProjectContent = ({ details }) => (
    <div className="projectDetailsContent">
        <h4 className="projectYear">Année: {details.year}</h4>
        
        {/* Technologies */}
        <div className="detail-section technologies-list">
            <h5>Technologies Utilisées</h5>
            <p className="tech-tags">{details.technologies.join(' | ')}</p>
        </div>

        {/* Résumé */}
        <div className="detail-section">
            <h5>Résumé du projet</h5>
            <p>{details.resume}</p>
        </div>

        {/* Contribution Personnelle */}
        <div className="detail-section">
            <h5>Ma Contribution Personnelle</h5>
            <p>{details.persoContribu}</p>
        </div>

        {/* Lien du Rapport (si existe) */}
        {details.rapportLien && (
            <div className="detail-section">
                <h5>Rapport Complet</h5>
                <a href={details.lien} target="_blank" rel="noopener noreferrer" className="rapport-link">
                    Consulter le Rapport
                </a>
            </div>
        )}
    </div>
);


// ------------------------------------------------
// Composant principal (réutilisable)
// ------------------------------------------------
export const DetailsView = ({ details, type, categoryName, onClose, isMobileDetailsOpen }) => {
    if (!details) return null;

    const isModalOpen = isMobileDetailsOpen; 

    // Le titre affiché
    const title = type === 'project' ? details.name : categoryName;

    return (
        <div className={`DetailsView ${isModalOpen ? 'mobile-overlay' : ''} type-${type}`}>

            {/* Bouton de fermeture visible en mode modale/plein écran */}
            {(isModalOpen || type === 'project') && ( // Affiché sur projet ou sur mobile skill
                <button className="modalCloseButton" onClick={onClose}>&times;</button>
            )}

            <h3 className="modalTitle">{title}</h3>

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
    );
};

export default DetailsView;