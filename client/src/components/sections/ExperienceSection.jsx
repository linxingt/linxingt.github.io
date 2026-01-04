import { useState, useEffect } from 'react';
import ExperienceCard from '../Card';
import { DetailsView } from '../DetailsView';
import { useWindowSize } from '../../hooks/useWindowSize';
import { api } from '../../utils/api';
import './styles/Experience.scss';

const ExperienceSection = () => {
    const [allExperience, setAllExperience] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [activeExperienceId, setActiveExperienceId] = useState(null);
    const [isMobileDetailsOpen, setIsMobileDetailsOpen] = useState(false);

    const { isMobile } = useWindowSize();

    useEffect(() => {
        api.get("/api/experience")
            .then(res => {
                setAllExperience(res.data);
                if (res.data.length > 0) {
                    const firstId = res.data[0]._id;
                    setActiveExperienceId(firstId);
                    fetchDetails(firstId);
                }
            }).catch(err => console.error("Erreur fetch experience:", err));
    }, []);

    const fetchDetails = async (id) => {
        try {
            const res = await api.get(`/api/experience/${id}`);
            setSelectedExperience(res.data);
        } catch (err) {
            console.error("Erreur lors du fetch de la experience:", err);
        }
    }

    const handleClick = async (id) => {
        if (id === activeExperienceId) return;
        setActiveExperienceId(id);
        fetchDetails(id);
        if (isMobile) {
            setIsMobileDetailsOpen(true);
        }
    };

    const handleCloseMobile = () => {
        setIsMobileDetailsOpen(false);
    }


    return (
        <section id="experience" className="experienceSection">
            <h2>EXPÉRIENCE</h2>
            <div className="experienceContainer">
                <div className="timelineWrapper">
                    <div className="timeline">
                        {allExperience.map((experience) => (
                            <div
                                key={experience._id}
                                className={`timelineItem ${activeExperienceId === experience._id ? 'active' : ''}`}
                            >
                                <div className="timelineMarker">
                                    <div className="circle"></div>
                                </div>
                                <ExperienceCard
                                    type='experience'
                                    info={experience}
                                    onClick={() => handleClick(experience._id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {!isMobile && selectedExperience && (
                    <div className="expDetailsPanel">
                        <DetailsView
                            type="experience"
                            details={selectedExperience}
                            onClose={handleCloseMobile}
                            isMobileDetailsOpen={false}
                        />
                    </div>
                )}

                {(isMobile && isMobileDetailsOpen && selectedExperience) && (
                    <div className="RectangleOverlay" onClick={handleCloseMobile}>
                        <div className="RectangleShowContainer" onClick={(e) => e.stopPropagation()}>
                            <DetailsView
                                type="experience"
                                details={selectedExperience}
                                onClose={handleCloseMobile}
                                isMobileDetailsOpen={true}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};


export default ExperienceSection;