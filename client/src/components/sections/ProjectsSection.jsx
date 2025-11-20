import { useState, useEffect, useCallback } from 'react';
import ProjectCard from '../Card';
import ProjectFilter from '../Filter';
import { DetailsView } from '../DetailsView';
import { api } from '../../utils/api';
import './styles/Projects.scss';

const ProjectsSection = () => {
    const [projects, setProjects] = useState([]);
    const [filterOptions, setFilterOptions] = useState({ annees: [], technologies: [] });
    const [activeFilters, setActiveFilters] = useState({ annee: '', technologies: [] });
    const [selectedProject, setSelectedProject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProjects = useCallback(async () => {
        setIsLoading(true);
        try {
            const params = {
                annee: activeFilters.annee,
                technologies: activeFilters.technologies.join(','),
            };
            const res = await api.get("/api/projects/", { params });
            setProjects(res.data);
        } catch (error) {
            console.error("Erreur lors du fetch des projets:", error);
        } finally {
            setIsLoading(false);
        }
    }, [activeFilters]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const res = await api.get("/api/projects/options");
                setFilterOptions(res.data);
            } catch (error) {
                console.error("Erreur lors du fetch des options:", error);
            }
        };
        fetchOptions();
    }, []);


    const handleProjectClick = async (projectId) => {
        try {
            const res = await api.get(`/api/projects/${projectId}`);
            setSelectedProject(res.data);
        } catch (error) {
            console.error("Erreur lors du fetch du projet:", error);
        }
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    return (
        <section id="projects" className="projectsSection">
            <h2>PROJETS</h2>
            <div className="projectsContainer">
                <div className="projFixedContainer">
                    <ProjectFilter
                        options={filterOptions}
                        activeFilters={activeFilters}
                        onFilterChange={setActiveFilters}
                    />

                </div>
                <div className="projScrolledContainer">
                    <div className="projectsList">
                        {isLoading ? (
                            <p className="loadingText small">Chargement des projets...</p>
                        ) : projects.length > 0 ? (
                            projects.map((project) => (
                                <ProjectCard
                                    type='project'
                                    key={project._id}
                                    info={project}
                                    onClick={() => handleProjectClick(project._id)}
                                />
                            ))
                        ) : (
                            <p className="loadingText small">Aucun projet trouvé avec ces filtres.</p>
                        )}
                    </div>
                </div>

                {selectedProject && (
                    <DetailsView
                        type="project"
                        details={selectedProject}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </section>
    );
};


export default ProjectsSection;