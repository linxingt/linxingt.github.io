import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendNotificationEmail = async (messageData, isNew, operationType) => {
    let subject;
    if (isNew) {
        subject = `Nouveau message de ${messageData.nickname}`;
    } else {
        subject = `Message ${operationType} - pseudo: ${messageData.nickname}`;
    }

    const contentHtml = `
        <h2>${subject}</h2>
        <p><strong>Pseudo :</strong> ${messageData.nickname}</p>
        <p><strong>Est public :</strong> ${messageData.isPublic ? 'Oui' : '<span style="color: red;">Non</span>' }</>
        ${messageData.wantsReply ? '<p style="color: red;"><strong>Demande de réponse : Oui</strong></p>' : ''}
        <hr>
        <h3>Contenu du message:</h3>
        <div style="border: 1px solid #ccc; padding: 10px;">
            ${messageData.content.substring(0, 500)}... 
        </div>
        ${messageData.associatedID ? `<p><strong>Réponse à :</strong> ${messageData.associatedID} dans le message ${messageData.parentID}</p>` : ''}
        <p><strong>Heure de création :</strong> ${new Date(messageData.createdAt).toLocaleString()}</p>
    `;

    const mailOptions = {
        from: 'Eportfolio <onboarding@resend.dev>',
        to: process.env.EMAIL_USER,
        subject: subject,
        html: contentHtml
    };

    try {
        await resend.emails.send(mailOptions);
        console.log(`Notification email for ${operationType} sent successfully with Resend.`);
    } catch (error) {
        console.error('Error sending notification email with Resend:', error);
    }
};