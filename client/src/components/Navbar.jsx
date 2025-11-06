import { Link, useLocation } from 'react-router-dom';
import { useState } from "react";
import './styles/Navbar.scss';
const Navbar = () => {

    const parties = ['À Propos', 'Formation', 'Compétences', 'Projets', 'Expérience', 'Loisirs'];

    const location = useLocation();
    const [open, setOpen] = useState(false);

    const scrollTo = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setOpen(false);
        };
    };

    return (
        <nav className="navbar">
            {location.pathname === "/" ? (
                <>
                    <div
                        className={`hamburger ${open ? "toggle" : ""}`}
                        onClick={() => setOpen(!open)}
                    >
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>

                    <div className={`navLinks ${open ? "open" : ""}`}>
                        {parties.map((item) => (
                            <a
                                key={item}
                                onClick={() => scrollTo(item)}
                                className={`navItem ${open ? "show" : ""}`}
                            >
                                {item}
                            </a>
                        ))}
                        <Link to="/guestbook" className="navItem">
                            Écrire un message
                        </Link>
                    </div>
                </>
            ) : (
                <Link to="/" className="navItem">
                    ← Back to Home
                </Link>
            )}
        </nav>
    );
}

export default Navbar;
