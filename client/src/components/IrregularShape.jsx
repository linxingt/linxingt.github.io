import { motion } from "motion/react";
import { useWindowSize } from '../hooks/useWindowSize';
import './styles/IrregularShape.scss';

export const IrregularShape = ({ index, category, onMouseEnter, isActive }) => {

  const { isMobile } = useWindowSize();

  const getIrregularShape = (index) => {
    const shapes = [
      '41% 39% 47% 43% / 48% 32% 68% 32%',
      '57% 13% 36% 14% / 59% 64% 60% 52% ',
      '64% 36% 29% 31% / 59% 71% 63% 57%',
      '50% 50% 33% 67% / 62% 36% 64% 38%'
    ];
    return shapes[index % shapes.length];
  };

  const getIrregularPosition = (index) => {
    const positions = [
      '1 / 1 / 2 / 2',
      '2 / 2 / 3 / 3',
      '3 / 1 / 4 / 2',
      '4 / 2 / 5 / 3'
    ];
    return positions[index % positions.length];
  };

  return (
    <motion.button
      className={`skillSphere ${isActive ? 'active' : ''}`}
      onClick={onMouseEnter}
      onMouseEnter={!isMobile ? onMouseEnter : undefined}
      style={{
        borderRadius: getIrregularShape(index),
        gridArea: getIrregularPosition(index),
      }}
      whileTap={{ scale: 0.8 }}
    >
      <div className="sphereTitle">
        <p className='sphereTitleText'>{category.name}</p>
      </div>
    </motion.button>
  );
}
