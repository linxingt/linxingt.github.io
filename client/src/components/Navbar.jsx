import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import ActionButton from './ActionButton';
import './styles/Navbar.scss';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {

    const parties = [
        { name: 'À Propos', id: 'about' },
        { name: 'Formation', id: 'education' },
        { name: 'Compétences', id: 'skills' },
        { name: 'Projets', id: 'projects' },
        { name: 'Expérience', id: 'experience' },
        { name: 'Loisirs', id: 'hobbies' }
    ];

    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    const scrollTo = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setOpen(false);
        };
    };

    return (
        <nav className="navbar">
            <div
                className={`hamburger ${open ? "toggle" : ""}`}
                onClick={() => setOpen(!open)}
            >
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>

            {location.pathname === "/" ? (
                <>
                    <div className={`navLinks ${open ? "open" : ""}`}>
                        {parties.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className={`navItem ${open ? "show" : ""}`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>

                    <ActionButton
                        shape="circle"
                        onClick={() => navigate('/guestbook')}
                        text="Livre d'Or"
                        symbol="🕮"
                        position='fixed'
                        animation={true}
                        top={true}
                        verti='100px'
                        horiz='30px'
                        backgroundColor='#2c9af3ff'
                    >
                    </ActionButton>
                </>
            ) : (
                <div className={`navLinks ${open ? "open" : ""}`}>
                    <button
                        onClick={() => navigate('/')}
                        className={`navItem ${open ? "show" : ""}`}
                    >
                        ← Page d'accueil
                    </button>
                </div>
            )
            }
        </nav >
    );
}

export default Navbar;
