import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  progress: { type: Number, min: 0, max: 100, required: false }
});

const skillGroupSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  groupName: { type: String, required: true },
  skills: [skillSchema]
});

export default mongoose.model("SkillGroup", skillGroupSchema);