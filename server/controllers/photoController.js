import Photo from '../models/schemas/PhotographySchema.js';

export const getAllPhotos = async (req, res) => {
    try {
        const allPhotos = await Photo.find({ lien: { $ne: "" } }).sort({ year: -1 });
        res.json(allPhotos);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des photos: " + err.message });
    }
};

