import { useState, useEffect, useCallback } from 'react'; // Ajout de useCallback
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import ActionButton from '../components/ActionButton';
import TextEditor from '../components/TextEditor';
import './styles/GuestbookFormPage.scss';

const GuestbookFormPage = ({ mode }) => {
  const [donneesFormulaire, setDonneesFormulaire] = useState({
    pseudonyme: '',
    contenu: '',
    questionSecurite: '',
    reponseSecurite: '',
    estPublic: true,
    veutReponse: false
  });

  const [enChargement, setEnChargement] = useState(false);
  const [messageErreur, setMessageErreur] = useState('');
  const [messageSucces, setMessageSucces] = useState('');
  const [identifiantMessage, setIdentifiantMessage] = useState(null);
  const [associatedID, setAssociatedID] = useState(null);
  const navigate = useNavigate();

  const retourPage = useCallback(() => {
    navigate('/guestbook');
  }, [navigate]);

  const gererChangement = (e) => {
    const { name, value, type, checked } = e.target;
    setDonneesFormulaire(precedent => ({
      ...precedent,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditorChange = (markdownContent) => {
    setDonneesFormulaire(precedent => ({
      ...precedent,
      contenu: markdownContent
    }));
  };

  const gererSoumission = async (e) => {
    e.preventDefault();
    setEnChargement(true);
    setMessageErreur('');
    setMessageSucces('');

    try {
      const donneesApi = {
        nickname: donneesFormulaire.pseudonyme,
        content: donneesFormulaire.contenu,
        securityAnswer: donneesFormulaire.reponseSecurite,
        isPublic: donneesFormulaire.estPublic,
        wantsReply: donneesFormulaire.veutReponse,
        ...(associatedID && { associatedID: associatedID })
      };

      let reponse;
      if (mode === 'create' || mode === 'reply') {
        donneesApi.securityQuestion = donneesFormulaire.questionSecurite;
        reponse = await api.post('/api/guestbook', donneesApi);
        setMessageSucces(reponse.data.message || 'Message envoyé avec succès!');

      } else if (mode === 'edit' && identifiantMessage) {
        reponse = await api.put(`/api/guestbook/${identifiantMessage}`, donneesApi);
        setMessageSucces(reponse.data.message || 'Message mis à jour avec succès!');
      }

      setTimeout(() => {
        retourPage();
      }, 1500);

    } catch (erreur) {
      setMessageErreur(erreur.response?.data?.message || "Une erreur s'est produite lors de la soumission.");
    } finally {
      setEnChargement(false);
    }
  };

  useEffect(() => {
    const chargerMessage = async () => {
      if (mode === 'create') return;
      const cheminUrl = window.location.pathname;
      const id = cheminUrl.split('/').pop();
      if (!id) {
        setMessageErreur("ID du message manquant pour la modification ou la réponse.");
        return;
      }

      else if (mode === 'reply') {
        if (id) {
          setAssociatedID(id);
        }
      }
      else if (mode === 'edit') {
        setIdentifiantMessage(id);
        setEnChargement(true);

        try {
          const res = await api.get(`/api/guestbook/${id}`);
          const selectedMessage = res.data;

          if (selectedMessage) {
            setDonneesFormulaire({
              pseudonyme: selectedMessage.nickname,
              contenu: selectedMessage.content,
              questionSecurite: selectedMessage.securityQuestion || '',
              reponseSecurite: '',
              estPublic: selectedMessage.isPublic,
              veutReponse: selectedMessage.wantsReply
            });
          } else {
            setMessageErreur("Données du message introuvables.");
          }

        } catch (error) {
          console.error("Erreur lors du fetch du message:", error);
          setMessageErreur("Impossible de charger les données du message pour la modification.");
        } finally {
          setEnChargement(false);
        }
      }
    };

    chargerMessage();

  }, [mode]);

  return (
    <div className="conteneurPageFormulaire">
      <form className="carteFormulaire">
        <h3 className="titreFormulaire">
          {mode === 'create' ? 'Nouveau Message' : 'Modifier le Message'}
        </h3>
        {messageErreur && <div className="alerteErreur">{messageErreur}</div>}
        {messageSucces && <div className="alerteSucces">{messageSucces}</div>}
        {enChargement && mode === 'edit' && <div>Chargement du message...</div>}

        <div className="espacementChamps">

          <div className="groupeChamp">
            <label className="etiquetteChamp">Pseudo</label>
            <input
              type="text"
              name="pseudonyme"
              value={donneesFormulaire.pseudonyme}
              onChange={gererChangement}
              className="champSaisie"
              placeholder="Votre pseudo"
            />
          </div>

          <div className="groupeChamp">
            <label className="etiquetteChamp">Question de sécurité
              <div className="infoBulleContainer">
                <span className="symboleInfo">?</span>
                <div className="infoBulleTexte">
                  Utilisée pour <b>protéger</b> votre message. Vous devrez la <b>créer ici</b> (ex: Couleur préférée?) et fournir la réponse lors de toute tentative de modification ou de suppression.
                </div>
              </div>
            </label>
            <input
              type="text"
              name="questionSecurite"
              value={donneesFormulaire.questionSecurite}
              onChange={gererChangement}
              className="champSaisie"
              placeholder="Ex: Quel est le nom de votre animal?"
              disabled={mode === 'edit'}
            />
          </div>

          <div className="groupeChamp">
            <label className="etiquetteChamp">
              {mode === 'edit' ? 'Réponse (pour vérification)' : 'Réponse de sécurité'}
              <div className="infoBulleContainer">
                <span className="symboleInfo">?</span>
                <div className="infoBulleTexte">
                  Cette réponse sera <b>enregistrée et cryptée</b>. Vous devrez la fournir correctement pour confirmer toute modification ou suppression future de votre message. <b>Veuillez la mémoriser.</b>
                </div>
              </div>
            </label>
            <input
              type="text"
              name="reponseSecurite"
              value={donneesFormulaire.reponseSecurite}
              onChange={gererChangement}
              className="champSaisie"
              placeholder="Votre réponse"
            />
          </div>

          <div className="groupeChamp">
            <label className="etiquetteChamp">Message&nbsp;<small> (1000 caractères maximum)</small></label>
            <TextEditor
              value={donneesFormulaire.contenu}
              onChange={handleEditorChange}
              placeholder="Écrivez votre message ..."
            />
          </div>

          <div className="groupeInterrupteur">
            <span className="libelleInterrupteur">Message public
              <div className="infoBulleContainer">
                <span className="symboleInfo">?</span>
                <div className="infoBulleTexte">
                  Si <b>coché</b>, votre message apparaîtra sur le <b>Livre d'Or</b> du site. Si <b>décoché</b>, il ne sera <b>visible que par Xingtong</b>.
                </div>
              </div>
            </span>
            <label className="conteneurInterrupteur">
              <input
                type="checkbox"
                name="estPublic"
                checked={donneesFormulaire.estPublic}
                onChange={gererChangement}
                className="entreeInterrupteur"
              />
              <div className="curseurInterrupteur"></div>
            </label>
          </div>

          <div className="groupeInterrupteur">
            <span className="libelleInterrupteur">Souhaite une réponse
              <div className="infoBulleContainer">
                <span className="symboleInfo">?</span>
                <div className="infoBulleTexte">
                  Si <b>coché</b>, un bouton "<b>Répondre</b>" apparaîtra sur votre message, permettant à Xingtong et aux autres visiteurs de vous laisser une réponse. <b>Sinon, aucune réponse</b> ne sera possible.
                </div>
              </div>
            </span>
            <label className="conteneurInterrupteur">
              <input
                type="checkbox"
                name="veutReponse"
                checked={donneesFormulaire.veutReponse}
                onChange={gererChangement}
                className="entreeInterrupteur"
              />
              <div className="curseurInterrupteur"></div>
            </label>
          </div>

          <div className="groupeBoutons">
            <ActionButton
              onClick={retourPage}
              backgroundColor='white'
              color='#1f2937'
              text='Annuler'
              disabled={enChargement}
            />
            <ActionButton
              onClick={gererSoumission}
              backgroundColor='#6e5d45'
              text={enChargement ? 'En cours...' : mode === 'create' ? 'Envoyer' : mode === 'edit' ? 'Mettre à jour' : 'Répondre'}
              disabled={enChargement}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default GuestbookFormPage;