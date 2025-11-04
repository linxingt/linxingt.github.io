import mongoose from 'mongoose';
import SkillGroup from './SkillGroupSchema.js';

const skillCategorySchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  groups: [
      {
        type: String,
        ref: "SkillGroup",
        required: true
      },
    ],
});

export default mongoose.model('SkillCategory', skillCategorySchema);
