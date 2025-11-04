import './styles/IrregularShape.scss';

export const IrregularShape = ({ index, category, onClick, isActive }) => {
  const getIrregularShape = (index) => {
    const shapes = [
      '31% 29% 47% 43% / 78% 22% 68% 32%',
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

  const getBgColor = (index) => {
    const shapes = [
      '#FDD6CB',
      '#FFE5B5 ',
      '#DBC6BA',
      '#F0B2B7'
    ];
    return shapes[index % shapes.length];
  };

  return (
    <div
      className={`skillSphere ${isActive ? 'active' : ''}`}
      onClick={onClick}
      style={{
        borderRadius: getIrregularShape(index),
        gridArea: getIrregularPosition(index),
        backgroundColor: getBgColor(index)
      }}
    >
      <div className="sphereTitle">
        <p className='sphereTitleText'>{category.name}</p>
      </div>
    </div>
  );
}
