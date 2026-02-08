import { motion } from "motion/react";
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
    <div className="communDetailsContent">
        <div className="projectInfo">
            <p className="projectYear">Année: {details.year}</p>

            <div className="detailViewSection">
                <h5>Technologies Utilisées</h5>
                <div className="techTags">
                    {details.technologies.map((tech, index) => (
                        <span key={index} className="techTag small">{tech}</span>
                    ))}
                </div>
            </div>

            <div className="detailViewSection">
                <h5>Mots-clés</h5>
                <div className="keywordTags">
                    {details.keyWordDescri.map((keyword, index) => (
                        <span key={index} className="keywordTag small">{keyword}</span>
                    ))}
                </div>
            </div>

            <div className="detailViewSection">
                <h5>Résumé du projet</h5>
                <p>{details.resume}</p>
            </div>

            <div className="detailViewSection">
                <h5>Ma Contribution Personnelle</h5>
                <ul className="achievementsList">
                    {details.persoContribu.map((contribu, index) => (
                        <li key={index}>{contribu}</li>
                    ))}
                </ul>
            </div>

            {details.lien && (
                <div className="detailViewSection">
                    <h5>Lien du Projet / GitHub</h5>
                    <a href={details.lien} target="_blank" rel="noopener noreferrer" className="detailLink">
                        Accéder au Projet / Dépôt
                    </a>
                </div>
            )}
        </div>
    </div>
);


const ExperienceContent = ({ details }) => (
    <div className="communDetailsContent">
        <div className="experienceInfo">
            <div className="experienceHeader">
                <h4>{details.company}</h4>
                <p className="experiencePeriode small">{details.periode}</p>
            </div>

            <div className="detailViewSection">
                <h5>Technologies Appliquées</h5>
                <div className="techTags">
                    {details.technologies.map((tech, index) => (
                        <span key={index} className="techTag small">{tech}</span>
                    ))}
                </div>
            </div>

            <div className="detailViewSection">
                <h5>Outils Utilisés</h5>
                <div className="keywordTags">
                    {details.toolUsed.map((tool, index) => (
                        <span key={index} className="keywordTag small">{tool}</span>
                    ))}
                </div>
            </div>

            {details.contextAndContributions && (
                <>
                    <div className="detailViewSection">
                        <h5>Contexte</h5>
                        <p>{details.contextAndContributions.context}</p>
                    </div>

                    {details.contextAndContributions.achievements && details.contextAndContributions.achievements.length > 0 && (
                        <div className="detailViewSection">
                            <h5>Réalisations & Contributions</h5>
                            <ul className="achievementsList">
                                {details.contextAndContributions.achievements.map((achievement, index) => (
                                    <li key={index}>{achievement}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    </div>
);

export const DetailsView = ({ details, type, categoryName, onClose, isMobileDetailsOpen = false }) => {
    if (!details) return null;

    const title = type === 'project' ? details.name : type === 'experience'
        ? details.name : categoryName;


    const isFullscreen = type === 'project' || isMobileDetailsOpen && (type === 'skill' || type === 'experience');

    return (
            <div className={`DetailsView ${isFullscreen ? 'fullscreenModal' : ''}`}>
            {isFullscreen && <div className={`modalOverlay type-${type}`} onClick={onClose}></div>}
            <motion.div
                className={`modalContainer type-${type}`}
                initial={isMobileDetailsOpen ? { opacity: 0, y: 30 } : { opacity: 0.8, y: 60 }} // Évite le saut sur desktop
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <div className="modalHeader">
                    <h3 className="modalTitle">{title}</h3>
                    {isFullscreen && <button className="modalCloseButton" onClick={onClose}>×</button>}
                </div>
                <div className="modalContent">
                    {type === 'skill' && <SkillContent details={details} />}
                    {type === 'project' && <ProjectContent details={details} />}
                    {type === 'experience' && <ExperienceContent details={details} />}
                </div>
            </motion.div>
        </div>
    );
};

export default DetailsView;