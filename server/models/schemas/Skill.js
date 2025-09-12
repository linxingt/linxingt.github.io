import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  groups: [
      {
        type: String,
        ref: "SkillGroup",
        required: true,
      },
    ],
});

export default mongoose.model('Skill', skillSchema);
