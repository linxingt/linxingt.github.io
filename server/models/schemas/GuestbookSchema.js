import mongoose from 'mongoose'

const guestbookSchema = new mongoose.Schema({
    nickname: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    securityQuestion: { type: String, required: true },
    securityAnswer: { type: String, required: true },
    isPublic: { type: Boolean, default: true },
    wantsReply: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
    associatedID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guestbook",
        required: false
    },
    parentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guestbook",
        required: false
    }
});

export default mongoose.model("Guestbook", guestbookSchema);