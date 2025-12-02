import Guestbook from '../models/schemas/GuestbookSchema.js';
import bcrypt from 'bcryptjs';
// import { sendNotificationEmail } from '../utils/emailService.js';

export const showAllMessages = async (req, res) => {
    try {
        const messages = await Guestbook
            .find({ isPublic: true })
            .select('-securityAnswer')
            .populate('associatedID', 'nickname content associatedID')
            .sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des messages: " + err.message });
    }
};

export const showOneMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Guestbook.findById(id).select('-securityAnswer').populate('associatedID', 'nickname content');

        res.status(200).json(message);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération du message: " + err.message });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { nickname, content, securityQuestion, securityAnswer, isPublic, wantsReply, associatedID } = req.body;

        if (!nickname || !content || !securityQuestion || !securityAnswer) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        let cleanedContent = content.replace(/\s{3,}/g, '\n\n');

        const cleanedAnswer = securityAnswer.trim();
        // garantit que deux utilisateurs ayant la même réponse de sécurité auront des hachages différents
        const salt = await bcrypt.genSalt(10);
        const hashedAnswer = await bcrypt.hash(cleanedAnswer, salt);

        let parentID = null;

        if (associatedID) {
            const parentMessage = await Guestbook.findById(associatedID).select('parentID');

            if (parentMessage) {
                parentID = parentMessage.parentID || parentMessage._id;
            } else {
                return res.status(404).json({ message: "Message associé non trouvé." });
            }
        }

        const newMessage = new Guestbook({
            nickname,
            content: cleanedContent,
            securityQuestion,
            securityAnswer: hashedAnswer,
            isPublic: isPublic !== undefined ? isPublic : true,
            wantsReply: wantsReply !== undefined ? wantsReply : false,
            associatedID: associatedID || null,
            parentID: parentID
        });

        const savedMessage = await newMessage.save();

        // await sendNotificationEmail(savedMessage.toObject(), true, 'created');

        res.status(201).json({
            message: associatedID ? "Réponse envoyée avec succès." : "Message envoyé avec succès.",
            data: {
                _id: savedMessage._id,
                nickname: savedMessage.nickname,
                createdAt: savedMessage.createdAt,
                isPublic: savedMessage.isPublic,
                wantsReply: savedMessage.wantsReply,
                associatedID: savedMessage.associatedID
            }
        });

    } catch (err) {
        res.status(500).json({ error: "Erreur lors de l'envoi du message: " + err.message });
    }
};

async function findAllChildrenIds(messageId) {
    const children = await Guestbook.find({
        $or: [
            { associatedID: messageId },
            { parentID: messageId }
        ]
    }).select('_id');

    let all = [...children.map(c => c._id)];

    for (const child of children) {
        const sub = await findAllChildrenIds(child._id);
        all = [...all, ...sub];
    }
    return all;
}


export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { securityAnswer } = req.body;

        if (!securityAnswer) {
            return res.status(400).json({ message: "La réponse de sécurité doit être fournie pour la suppression." });
        }

        const message = await Guestbook.findById(id);

        if (!message) {
            return res.status(404).json({ message: "Message non trouvé." });
        }

        const cleanedSecurityAnswer = securityAnswer.trim();
        const isMatch = await bcrypt.compare(cleanedSecurityAnswer, message.securityAnswer);

        if (!isMatch) {
            return res.status(403).json({ message: "Réponse de sécurité incorrecte, impossible d'effectuer l'opération de suppression." });
        }

        const allChildren = await findAllChildrenIds(id);
        const deleteIds = [id, ...allChildren];

        const result = await Guestbook.deleteMany({ _id: { $in: deleteIds } });

        const messageCount = result.deletedCount;
        const successMessage = messageCount > 1
            ? `${messageCount} messages (message principal et réponses) supprimés avec succès.`
            : "Message supprimé avec succès.";

        res.status(200).json({ message: successMessage });

    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la suppression du message: " + err.message });
    }
};

export const updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { nickname, content, securityAnswer, isPublic, wantsReply } = req.body;

        if (!nickname || !content || !securityAnswer) {
            return res.status(400).json({
                message: "Le nouveau contenu et la réponse de sécurité doivent être fournis."
            });
        }

        let cleanedContent = content.replace(/\s{3,}/g, '\n\n');
        const message = await Guestbook.findById(id);

        if (!message) {
            return res.status(404).json({
                message: "Message non trouvé."
            });
        }

        const cleanedSecurityAnswer = securityAnswer.trim();
        const isMatch = await bcrypt.compare(cleanedSecurityAnswer, message.securityAnswer);

        if (!isMatch) {
            return res.status(403).json({
                message: "Réponse de sécurité incorrecte, impossible d'effectuer l'opération de mise à jour."
            });
        }

        message.nickname = nickname;
        message.content = cleanedContent;
        message.isPublic = isPublic;
        message.wantsReply = wantsReply;
        message.updatedAt = Date.now();

        const updatedMessage = await message.save();

        // await sendNotificationEmail(updatedMessage.toObject(), false, 'updated');

        res.status(200).json({
            message: "Message mis à jour avec succès",
            data: {
                _id: updatedMessage._id,
                nickname: updatedMessage.nickname,
                content: updatedMessage.content,
                isPublic: updatedMessage.isPublic,
                wantsReply: updatedMessage.wantsReply,
                updatedAt: updatedMessage.updatedAt
            }
        });

    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du message: " + err.message });
    }
};
