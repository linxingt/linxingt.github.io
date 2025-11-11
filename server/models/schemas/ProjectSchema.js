import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  resume: { type: String, required: true },
  keyWordDescri: [{ type: String, required: true }],
  persoContribu: { type: String, required: true },
  imageName: { type: String, required: true },
  lien: { type: String, required: false },
});

export default mongoose.model("Project", projectSchema);