import SkillCategory from '../models/schemas/SkillCategorySchema.js';

export const getAllSkillCategory = async (req, res) => {
    try {
    const skillCategory = await SkillCategory.find();
    res.json(skillCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSkillGroupDetails = async (req, res) => {
    try {
    const skills = await SkillCategory.findById(req.params.id).populate("groups");
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

