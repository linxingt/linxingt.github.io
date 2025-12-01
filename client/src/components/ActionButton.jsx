import './styles/ActionButton.scss';

const ActionButton = ({
    onClick, symbol = '', text = '', shape = 'rectangle', position = 'normal',
    backgroundColor = '#6F5E45', color = 'white', bottom = '1rem', right = '1rem',
    animation = false, disabled = false
}) => {

    let baseStyle = {
        background: backgroundColor,
        color: color,
        zIndex: position === 'fixed' ? 50 : 'auto',
        ...(shape === 'circle' && {
            width: '4rem',
            height: '4rem',
            borderRadius: '50%',
        }),
        ...(shape === 'rectangle' && {
            minWidth: '8rem',
            padding: '1rem',
            borderRadius: '8px',
        }),
    };

    let positionStyle;
    if (position === 'fixed') {
        positionStyle = {
            position: 'fixed',
            bottom: bottom,
            right: right,
        };
    }
    let animationStyle;
    if (animation) {
        animationStyle = {
            animation: 'pulseCircle 1.5s infinite alternate',
        };
    }

    const fabStyle = {
        ...baseStyle,
        ...positionStyle,
        ...animationStyle
    };


    return (
        <button className="actionBtn" style={fabStyle} onClick={onClick} title={text} disabled={disabled}>
            {shape === 'rectangle' && <span className='brnText' style={color = { color }}>{text}</span>}<span className='btnSymbol' style={color = { color }}> {symbol}</span>
        </button>
    );
};

export default ActionButton;