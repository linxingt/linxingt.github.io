import './styles/Footer.scss';
import email from '../assets/email.png';
import github from '../assets/github.png';
import linkedin from '../assets/linkedin.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const socialLinks = [
        { icon: github, href: "https://github.com/linxingt", label: "GitHub" },
        { icon: linkedin, href: "https://www.linkedin.com/in/linxingtong", label: "LinkedIn" },
        { icon: email, href: "mailto:xingtonglin011016@gmail.com", label: "Email" },
    ];
    return (
        <div className='footer' id='footer'>
            <div className='footerContainer'>
                <div className='persoInfo'>
                    <h3>LIN Xingtong </h3>
                    <p>Une développeuse fullstack qui cherche toujours à progresser et à acquérir de nouvelles connaissances/langages.</p>
                </div>
                <div className='socialLinks'>
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            rel="noreferrer"
                            target="_blank"
                            aria-label={`Lien vers ${link.label}`}
                        >
                            <img className="footerIcon" src={link.icon} />
                        </a>
                    ))}
                </div>
            </div>
            <div className='footerInfo'>
                <p>
                    Copyright © {currentYear}.
                    Développé par <a rel="noreferrer" target="_blank" href="https://xingtong.vercel.app/">LIN Xingtong</a>
                </p>
            </div>
        </div>
    );
}
export default Footer;