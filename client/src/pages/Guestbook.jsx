import { useState, useEffect, useCallback, useMemo } from 'react';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import MessageCard from '../components/MessageCard';
import ActionButton from '../components/ActionButton';
import './styles/Guestbook.scss';

const Guestbook = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleCardMenu = (messageId) => {
    setOpenMenuId(prevId => prevId === messageId ? null : messageId);
  };
  const closeAllMenus = () => {
    setOpenMenuId(null);
  };

  useEffect(() => {
    if (openMenuId === null) return;
    const scrollContainer = document.querySelector('.messagesListContainer');

    const handleScroll = () => {
      closeAllMenus();
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [openMenuId]);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/api/guestbook");
      setAllMessages(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleMessageAction = useCallback(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const { parentMessages, repliesMap } = useMemo(() => {
    const topLevelMessages = [];
    const rMap = new Map();
    allMessages.forEach(message => {
      if (!message.parentID) {
        topLevelMessages.push(message);
      } else {
        const parentID = message.parentID;
        if (rMap.has(parentID)) {
          rMap.get(parentID).push(message);
        } else {
          rMap.set(parentID, [message]);
        }
      }
    });

    topLevelMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    rMap.forEach(replies => {
      replies.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    });
    return { parentMessages: topLevelMessages, repliesMap: rMap };
  }, [allMessages]);

  const totalRepliesCount = useMemo(() => {
    let count = 0;
    repliesMap.forEach(replies => {
      count += replies.length;
    });
    return count;
  }, [repliesMap]);

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Chargement des messages...</div>;
  }

  return (
    <div className="guestbookContainer">
      <h2>Livre d'Or Public </h2>

      <p className="countersGuestbook small loadingText">
        {parentMessages.length} messages principaux | {totalRepliesCount} réponses
      </p>

      <div className="messagesListContainer">
        {parentMessages.map((message) => (
          <MessageCard
            key={message._id}
            message={message}
            repliesMap={repliesMap}
            onActionSuccess={handleMessageAction}
            openMenuId={openMenuId}
            onToggleMenu={toggleCardMenu}
            onCloseMenu={closeAllMenus}
          />
        ))}
      </div>

      <ActionButton onClick={() => navigate('/guestbook/new')}
        text="Ajouter un commentaire"
        symbol="+"
        shape='circle'
        position='fixed'
        animation={true}
        backgroundColor='#956DF8'
      />
    </div>
  );
}
export default Guestbook;
