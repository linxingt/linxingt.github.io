import { ProgressBar } from './ProgressBar';
import './styles/SkillDetailsView.scss';

export const SkillDetailsView = ({ details, categoryName, onClose, isMobileDetailsOpen }) => {
    if (!details) return null;

    const isMobile = window.innerWidth <= 768;

    return (
        <div className={`skillDetailsView ${isMobile && isMobileDetailsOpen ? 'mobile-overlay' : ''}`}>

            {(isMobile && isMobileDetailsOpen) && (
                <button className="modalCloseButton" onClick={onClose}>x</button>
            )}

            <h3 className="modalTitle">{categoryName}</h3>
            <div className="modalContent">
                {details.groups.map((group, groupIndex) => (
                    <div key={groupIndex} className="skillGroup">
                        <h5 className="groupTitle">{group.groupName}</h5>
                        <div className="skillsList">
                            {group.skills.map((skill, skillIndex) => (
                                <div key={skillIndex} className="skillItem">
                                    <div className="skillInfo">
                                        {skill.name}
                                        {skill.progress && <span className="skillPercentage small">{skill.progress}%</span>}
                                    </div>
                                    {skill.progress && <ProgressBar progress={skill.progress} delay={groupIndex * 0.1 + skillIndex * 0.05} />}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}