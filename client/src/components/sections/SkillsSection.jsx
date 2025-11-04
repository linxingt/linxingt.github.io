import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Skills.scss';
import { IrregularShape } from '../IrregularShape';
import { SkillDetailsView } from '../SkillDetailsView';

const SkillsSection = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeSkillDetails, setActiveSkillDetails] = useState(null);
  const [isMobileDetailsOpen, setIsMobileDetailsOpen] = useState(false); // Pour le mode mobile

  useEffect(() => {
    axios.get("http://localhost:5000/api/skills")
      .then(res => {
        setCategories(res.data);
        if (res.data.length > 0) {
          const firstId = res.data[0]._id;
          setActiveCategoryId(firstId);
          fetchDetails(firstId);
        }
      }).catch(err => console.error("Erreur fetch skills:", err));
  }, []);

  const fetchDetails = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/skills/${id}`);
      setActiveSkillDetails(res.data);
    } catch (err) {
      console.error("Erreur fetch skill group:", err);
    }
  }

  const handleClick = async (id) => {
    setActiveCategoryId(id);
    fetchDetails(id);
    if (window.innerWidth <= 768) {
      setIsMobileDetailsOpen(true);
    }
  };

  const handleCloseMobile = () => {
    setIsMobileDetailsOpen(false);
  }

  const activeCategoryName = categories.find(c => c._id === activeCategoryId)?.name;

  return (
    <section className="skillSection" id="skills">
      <h2 id="skillTitle">SKILLS</h2>
      <div className='skillContentContainer'>

        <div className='skillDetailsWrapper'>
          <SkillDetailsView
            details={activeSkillDetails}
            categoryName={activeCategoryName}
            onClose={handleCloseMobile}
            isMobileDetailsOpen={isMobileDetailsOpen}
          />
        </div>

        <div className='skillSphereParent'>
          {categories.map((cat, index) => (
            <IrregularShape
              key={cat._id}
              category={cat}
              index={index}
              isActive={activeCategoryId === cat._id}
              onClick={() => handleClick(cat._id)}
            />
          ))}
        </div>

        {/* L'overlay mobile */}
        {(window.innerWidth <= 768 && isMobileDetailsOpen) && (
          <div className="RectangleOverlay">
            <div className="RectangleShowContainer">
              <SkillDetailsView
                details={activeSkillDetails}
                categoryName={activeCategoryName}
                onClose={handleCloseMobile}
                isMobileDetailsOpen={isMobileDetailsOpen}
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default SkillsSection;
