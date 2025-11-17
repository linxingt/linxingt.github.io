import mongoose from 'mongoose'

const contextAndContributionsSchema = new mongoose.Schema({
  context: { type: String, required: true },
  achievements: [{ type: String, required: true }]
});

const experienceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  periode: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  contextAndContributions: contextAndContributionsSchema,
  toolUsed: [{ type: String, required: true }],
  imageName: { type: String, required: false }
});

export default mongoose.model("Experience", experienceSchema);