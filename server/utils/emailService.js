import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

dotenv.config();
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const transporter = nodemailer.createTransport({

    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    }
});

export const sendNotificationEmail = async (messageData, isNew, operationType) => {
    let subject;
    if (isNew) {
        subject = `Nouveau message de ${messageData.nickname}`;
    } else {
        subject = `Message ${operationType} - pseudo: ${messageData.nickname}`;
    }

    const cleanedContent = DOMPurify.sanitize(messageData.content.substring(0, 500));

    const contentHtml = `
        <h2>${subject}</h2>
        <p><strong>Pseudo :</strong> ${messageData.nickname}</p>
        <p><strong>Est public :</strong> ${messageData.isPublic ? 'Oui' : 'Non'}</p>
        ${messageData.wantsReply ? '<p style="color: red;"><strong>Demande de réponse : Oui</strong></p>' : ''}
        <hr>
        <h3>Contenu du message:</h3>
        <div style="border: 1px solid #ccc; padding: 10px;">
            ${cleanedContent}... 
        </div>
        ${messageData.associatedID ? `<p><strong>Réponse à :</strong> ${messageData.associatedID} dans le message ${messageData.parentID}</p>` : ''}
        <p><strong>Heure de création :</strong> ${new Date(messageData.createdAt).toLocaleString()}</p>
    `;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: subject,
        html: contentHtml
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Notification email for ${operationType} sent successfully using OAuth2.`);
    } catch (error) {
        console.error('Error sending notification email with OAuth2:', error);
        if (error.responseCode === 401 || error.responseCode === 400) {
            console.error("Authentication failed. Check your CLIENT_ID, CLIENT_SECRET, and REFRESH_TOKEN.");
        }
    }
};