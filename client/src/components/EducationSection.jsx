import { useState } from 'react';

import './styles/Education.scss';

import ingeImage from "../assets/inge.jpg";
import iutImage from "../assets/iut.jpg";
import lyceeImage from "../assets/lycee.jpg";

const educationData = [
  {
    img: ingeImage,
    title: "ESIEE Paris - École d'ingénieurs",
    period: "2024 - 2027",
    major: "Filière « Informatique, algorithmes et développement »",
    details: ["Certificat Voltaire 845/1000 (code de vérification : DNKMTPT)"]
  },
  {
    img: iutImage,
    title: "IUT de Paris - Rives de Seine - Université Paris Cité",
    period: "2021 - 2024",
    major: "Parcours « Réalisation d'applications : conception, développement, validation »",
    details: ["note moyenne 14/20", "plusieurs projets réalisés en équipe ou solo", "3 stages en 2 entreprise"]
  },
  {
    img: lyceeImage,
    title: "Lycée Henri Bergson",
    period: "2017 - 2021",
    major: "STI2D spécifique « Systemes d'information et numérique »",
    details: ["DELF A2 obtenu en 2018", "DELF B1 obtenu en 2019", "BAC moyenne finale 15.28/20"]
  }
];

function EducationSection() {

  const [active, setActive] = useState(null);

  return (
    <section className="educationSection" id="education">
      <h2 className="educationTitle">EDUCATIONS</h2>

      {educationData.map((item, index) => (
        <div key={index}
          className={`educationItem ${active === index ? "active" : ""}`}
          onMouseEnter={() => setActive(index)}
          onMouseLeave={() => setActive(null)}
          style={{ backgroundImage: `url(${item.img})` }}
        >

          <div className="backgroundOverlay">
            <div className="content">
              <h3>{item.title}</h3>
              <h4 className="period">{item.period}</h4>
              <p id='major'>{item.major}</p>
              {active === index && (
                <div className="details">
                  <ul>
                    {item.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

        </div>
      ))
      }
    </section >
  );
}

export default EducationSection;
