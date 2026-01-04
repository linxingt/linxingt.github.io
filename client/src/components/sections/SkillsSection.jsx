import { useEffect, useState } from 'react';
import { IrregularShape } from '../IrregularShape';
import { DetailsView } from '../DetailsView';
import { useWindowSize } from '../../hooks/useWindowSize';
import { api } from '../../utils/api';
import './styles/Skills.scss';

const SkillsSection = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeSkillDetails, setActiveSkillDetails] = useState(null);
  const [isMobileDetailsOpen, setIsMobileDetailsOpen] = useState(false);

  const { isMobile } = useWindowSize();

  useEffect(() => {
    api.get("/api/skills")
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
      const res = await api.get(`/api/skills/${id}`);
      setActiveSkillDetails(res.data);
    } catch (err) {
      console.error("Erreur fetch skill group:", err);
    }
  }

  const handleClick = async (id) => {
    setActiveCategoryId(id);
    fetchDetails(id);
    if (isMobile) {
      setIsMobileDetailsOpen(true);
    }
  };

  const handleCloseMobile = () => {
    setIsMobileDetailsOpen(false);
  }

  const activeCategoryName = categories.find(c => c._id === activeCategoryId)?.name;

  return (
    <section className="skillSection" id="skills">
      <h2 id="skillTitle">COMPÉTENCES</h2>
      <div className='skillContentContainer'>

        {!isMobile && activeSkillDetails && (
          <div className='skillDetailsWrapper'>
            <DetailsView
              type="skill"
              details={activeSkillDetails}
              categoryName={activeCategoryName}
              onClose={handleCloseMobile}
              isMobileDetailsOpen={false}
            />
          </div>
        )}


        <div className='skillSphereParent'>
          {categories.map((cat, index) => (
            <IrregularShape
              key={cat._id}
              category={cat}
              index={index}
              isActive={activeCategoryId === cat._id}
              onMouseEnter={() => handleClick(cat._id)}
              // onMouseLeave={() => {}}
            />
          ))}
        </div>

        {(isMobile && isMobileDetailsOpen && activeSkillDetails) && (
          <div className="RectangleOverlay" onClick={handleCloseMobile}>
            <div className="RectangleShowContainer" onClick={(e) => e.stopPropagation()}>
              <DetailsView
                type="skill"
                details={activeSkillDetails}
                categoryName={activeCategoryName}
                onClose={handleCloseMobile}
                isMobileDetailsOpen={true}
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default SkillsSection;
