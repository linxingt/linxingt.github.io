import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import './styles/Navbar.scss';
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
                <div className={`navLinks ${open ? "open" : ""}`}>
                    {parties.map((item) => (
                        <a
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className={`navItem ${open ? "show" : ""}`}
                        >
                            {item.name}
                        </a>
                    ))}
                    <Link to="/guestbook" className={`navItem ${open ? "show" : ""}`}>
                        Écrire un message
                    </Link>
                </div>
            ) : (
                <div className={`navLinks ${open ? "open" : ""}`}>
                    <Link to="/" className={`navItem ${open ? "show" : ""}`}>
                        ← Page d'accueil
                    </Link>
                </div>
            )
            }
        </nav >
    );
}

export default Navbar;
