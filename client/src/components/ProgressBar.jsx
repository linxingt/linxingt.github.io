import './styles/ProgressBar.scss';
export const ProgressBar = ({ progress, delay = 0 }) => {
    return (
        <div className="progressBar">
            <div
                className="progressFill"
                style={{
                    width: `${progress}%`,
                    animationDelay: `${delay}s`
                }}
            />
        </div>
    );
}

