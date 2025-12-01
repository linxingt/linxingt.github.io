import Project from '../models/schemas/ProjectSchema.js';

export const getAllProjects = async (req, res) => {
    try {
        const { annee, technologies } = req.query;
        let filter = {};

        if (annee) {
            filter.year = annee;
        }

        if (technologies) {
            const techArray = technologies.split(',').map(t => t.trim()).filter(t => t);
            if (techArray.length > 0) {
                const escapeRegex = (string) => {
                    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                };
                filter.technologies = {
                    $all: techArray.map(t => new RegExp(`^${escapeRegex(t)}$`, 'i'))
                };
            }
        }
        const projects = await Project.find(filter).sort({ year: -1 }); // Tri par année décroissante
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des projets: " + err.message });
    }
};

export const getFilterOptions = async (req, res) => {
    try {
        const years = await Project.distinct('year');
        const technologies = await Project.distinct('technologies');

        const sortedYears = years.sort((a, b) => b - a);
        const sortedTechs = technologies.sort();

        res.status(200).json({
            annees: sortedYears,
            technologies: sortedTechs
        });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des options de filtre: " + err.message });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Projet non trouvé" });
        }
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération du projet: " + err.message });
    }
};

