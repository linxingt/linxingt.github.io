import Experience from '../models/schemas/ExperienceSchema.js';

export const getAllExperiences = async (req, res) => {
    try {
        const allExperiences = await Experience.find().sort({ _id: -1 });
        res.json(allExperiences);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des experiences: " + err.message });
    }
};

export const getExperienceById = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: "Experience non trouvé" });
        }
        res.status(200).json(experience);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération de la experience: " + err.message });
    }
};


