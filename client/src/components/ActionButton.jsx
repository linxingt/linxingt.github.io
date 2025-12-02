import './styles/ActionButton.scss';

const ActionButton = ({
    onClick, symbol = '', text = '', shape = 'rectangle', position = 'normal',
    backgroundColor = '#6F5E45', color = 'white', bottom = '1rem', right = '1rem',
    animation = false, disabled = false, smallHeight = false
}) => {

    let baseStyle = {
        background: backgroundColor,
        color: color,
        zIndex: position === 'fixed' ? 50 : 'auto',
        ...(shape === 'circle' && {
            width: smallHeight ? '2rem' : '4rem',
            height: smallHeight ? '2rem' : '4rem',
            borderRadius: '50%',
        }),
        ...(shape === 'rectangle' && {
            minWidth: '8rem',
            borderRadius: '8px',
            padding: smallHeight ? '0.5rem 1rem' : '1rem',
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

    const symbolStyle = {
        color: color,
        fontSize: smallHeight ? '1.3rem' : '2rem'
    };


    return (
        <button className="actionBtn" style={fabStyle} onClick={onClick} title={text} disabled={disabled}>
            {shape === 'rectangle' && <span className='brnText' style={color = { color }}>{text}</span>}<span className='btnSymbol' style={symbolStyle}>{symbol}</span>
        </button>
    );
};

export default ActionButton;