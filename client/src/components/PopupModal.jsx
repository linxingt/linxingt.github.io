import { useState } from 'react';
import ActionButton from './ActionButton';
import './styles/PopupModal.scss';

const PopupModal = ({
    affichageText, textYes = "Confirmer", textNo = "Annuler", onAction,
    onClose, hasInput = false, inputLabel, onActionSuccess = null
}) => {
    const [inputValue, setInputValue] = useState('');
    const [enChargement, setEnChargement] = useState(false);
    const [messageErreur, setMessageErreur] = useState('');
    const [messageSucces, setMessageSucces] = useState('');

    const handleYesClick = async () => {
        if (enChargement) return;
        setMessageErreur('');
        setMessageSucces('');
        setEnChargement(true);
        try {
            let resultatMessage;
            if (hasInput) {
                resultatMessage = await onAction(inputValue);
            } else {
                await onAction();
            }
            setMessageSucces(resultatMessage || 'Action réussie!');
        } catch (error) {
            let errorMessage = error.message;
            console.error(errorMessage);
            setMessageErreur(errorMessage);
        } finally {
            setEnChargement(false);
            setTimeout(() => {
                onClose();
                if (onActionSuccess) onActionSuccess();
            }, 2000);
        }
    };

    return (
        <div>
            <div className="RectangleOverlay" onClick={onClose}></div>
            <div className='popupModal'>
                <div className='popupContent'>
                    {messageErreur && <div className="alerteErreur">{messageErreur}</div>}
                    {messageSucces && <div className="alerteSucces">{messageSucces}</div>}

                    {!messageErreur && !messageSucces && (
                        <>
                            {affichageText}
                            {hasInput && (
                                <div className="groupeChampVerification">
                                    <label className="etiquetteChamp">
                                        {inputLabel}
                                    </label>
                                    <input
                                        type="text"
                                        name="inputValue"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="champSaisie"
                                        placeholder="Veuillez taper votre réponse ici..."
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div className='popupBtns'>
                    {!messageErreur && !messageSucces && (
                        <>
                            <ActionButton
                                onClick={onClose}
                                text={textNo}
                                backgroundColor='transparent'
                                color='black'
                            />
                            <ActionButton
                                onClick={handleYesClick}
                                text={textYes}
                                backgroundColor='#956DF8'
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PopupModal;