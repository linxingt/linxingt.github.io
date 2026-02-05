import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopupModal from './PopupModal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { api } from '../utils/api';
import './styles/MessageCard.scss';

const MessageCard = ({
    message, repliesMap = new Map(), isReply = false, onActionSuccess, openMenuId, onToggleMenu, onCloseMenu
}) => {
    const navigate = useNavigate();
    const [popupForId, setPopupForId] = useState(null);
    const [nombreAffiche, setNombreAffiche] = useState(1);
    const repliesForThisMessage = repliesMap.get(message._id) || [];
    const nombreReplies = repliesForThisMessage.length;
    const isMenuOpen = openMenuId === message._id;
    const isReplyToReply = isReply && message.associatedID?.associatedID;

    // du plus ancien au plus récent
    const repliesTries = [...repliesForThisMessage].sort((a, b) =>
        new Date(a.createdAt) - new Date(b.createdAt)
    );
    const repliesAffiches = repliesTries.slice(0, nombreAffiche);
    const repliesRestantes = repliesTries.length - nombreAffiche;

    const afficherPlus = () => {
        setNombreAffiche(prev => Math.min(prev + 10, repliesTries.length));
    };

    const formaterDateHeure = (chaineDate) => {
        const date = new Date(chaineDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString('fr-FR', options);
    };

    const deleteMessageApi = (id, securityAnswer) =>
        api.delete(`/api/guestbook/${id}`, {
            data: { securityAnswer }
        });

    const handleEdit = () => {
        onCloseMenu();
        navigate(`/guestbook/edit/${message._id}`);
    }

    const handleDeleteClick = (e) => {
        if (e) e.stopPropagation();
        onCloseMenu();
        setPopupForId(message._id);
    };

    const handleReplyClick = () => {
        onCloseMenu();
        navigate(`/guestbook/replyTo/${message._id}`);
    };

    const handleDelete = async (securityAnswer) => {
        try {
            await deleteMessageApi(message._id, securityAnswer);
            onCloseMenu();
            return "Message supprimé avec succès!";
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Une erreur inattendue est survenue lors de la suppression.';
            throw new Error(errorMessage);
        }
    };
    const isUpdate = message.updatedAt && message.updatedAt !== message.createdAt;
    return (
        <div className={`carteMessage ${isReply ? isReplyToReply ? 'isReplyToReplyCard' : 'isReplyCard' : ''}`}>
            <div className="enteteCarte">
                <div className="informationsAuteur">
                    <div className={`avatarAuteur ${isReply ? 'avatarReply' : ''}`}>
                        {message.nickname.charAt(0).toUpperCase()}
                    </div>
                    <div className="detailsAuteur">
                        <p className="nomAuteur">{message.nickname}</p>
                        <p className="dateMessage small">
                            {formaterDateHeure(message.createdAt)}
                            {isUpdate && (
                                <span className="badgeModifie small"> • Modifié</span>
                            )}
                        </p>
                    </div>
                </div>

                <div className="conteneurMenuActions">
                    <button
                        className="boutonMenuActions"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleMenu(message._id);
                        }}
                        aria-label="Options du message"
                    >
                        •••
                    </button>

                    {isMenuOpen && (
                        <div className="menuDeroulant">
                            {message.wantsReply && (
                                <button
                                    className="itemMenu itemRepondre"
                                    onClick={handleReplyClick}
                                >
                                    ⤶ Répondre
                                </button>
                            )}
                            <button
                                className="itemMenu itemModifier"
                                onClick={handleEdit}
                            >
                                ✎ Modifier
                            </button>
                            <button
                                className="itemMenu itemSupprimer"
                                onClick={handleDeleteClick}
                            >
                                ✖ Supprimer
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="contenuMessage">
                {isReplyToReply && (
                    <div className="reponseA small">
                        Réponse à {message.associatedID.nickname} :
                        <span className="contenuParentCible small">
                            "{message.associatedID.content.substring(0, 50) +
                                (message.associatedID.content.length > 50 ? '...' : '')
                            }"
                        </span>
                    </div>
                )}
                <div className="markdownBody">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                    >
                        {message.content}
                    </ReactMarkdown>
                </div>
            </div>

            {!isReply && nombreReplies > 0 && (
                <div className="sectionReplies">
                    <div className="listeReplies">
                        {repliesAffiches.map((reply) => (
                            <div key={reply._id} className="conteneurReplyImbrique">
                                <MessageCard
                                    key={reply._id}
                                    message={reply}
                                    repliesMap={repliesMap}
                                    isReply={true}
                                    onActionSuccess={onActionSuccess}
                                    openMenuId={openMenuId}
                                    onToggleMenu={(id) => onToggleMenu(id || reply._id)}
                                    onCloseMenu={onCloseMenu}
                                />
                            </div>
                        ))}
                    </div>

                    {repliesRestantes > 0 && (
                        <button className="boutonAfficherPlus small" onClick={afficherPlus}>
                            Afficher {Math.min(repliesRestantes, 10)} réponses supplémentaires ({repliesRestantes} restantes)
                        </button>
                    )}
                </div>
            )}

            {popupForId === message._id && (
                <PopupModal
                    affichageText={message.securityQuestion}
                    textYes="Confirmer la Suppression"
                    onAction={handleDelete}
                    onClose={() => setPopupForId(null)}
                    hasInput={true}
                    inputLabel="Votre réponse :"
                    onActionSuccess={onActionSuccess}
                />
            )}
        </div>
    );
};

export default MessageCard;