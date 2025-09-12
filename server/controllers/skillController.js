import Skill from '../models/schemas/Skill.js';

export const getAllSkills = async (req, res) => {
    try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSkillGroupDetails = async (req, res) => {
    try {
    const skills = await Skill.findById(req.params.id).populate("groups");
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

