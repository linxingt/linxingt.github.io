import mongoose from 'mongoose'

const photographySchema = new mongoose.Schema({
  name: { type: String, required: true },
  info: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  lien: { type: String, required: false },
});

export default mongoose.model("Photo", photographySchema);