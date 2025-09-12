import mongoose from 'mongoose'

const skillGroupSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  groupName: { type: String, required: true },
  skills: [{ type: String, required: true }]
});

export default mongoose.model("SkillGroup", skillGroupSchema);