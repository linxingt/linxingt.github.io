import { useState } from 'react';
import { motion } from "motion/react";

import './styles/Education.scss';

import ingeImage from "../../assets/inge.jpg";
import iutImage from "../../assets/iut.jpg";
import lyceeImage from "../../assets/lycee.jpg";

const educationData = [
  {
    img: ingeImage,
    title: "ESIEE Paris",
    period: "2024 - 2027",
    major: "Filière «Informatique, algorithmes et développement»",
    details: [`Certificat Voltaire : 845/1000 <br>(code de vérification : <a href="https://mon.certificat-voltaire.fr/verification-certificat?code=DNKMTPT" target="_blank" rel="noreferrer">DNKMTPT</a>)`,"Score TOEIC : 700/990"]
  },
  {
    img: iutImage,
    title: "IUT de Paris - Rives de Seine - Université Paris Cité",
    period: "2021 - 2024",
    major: "Parcours «Réalisation d'applications : conception, développement, validation»",
    details: ["Moyenne du cursus 14.7/20", "Plusieurs projets réalisés en équipe ou seule", "3 stages en 2 entreprises"]
  },
  {
    img: lyceeImage,
    title: "Lycée Henri Bergson",
    period: "2017 - 2021",
    major: "STI2D spécialité «Systemes d'information et numérique»",
    details: ["DELF A2 obtenu en 2018", "DELF B1 obtenu en 2019", "BAC moyenne finale 15.28/20"]
  }
];

const EducationSection = () => {

  return (
    <section className="educationSection" id="education">
      <h2 className="educationTitle">ÉDUCATIONS</h2>

      {educationData.map((item, index) => (
        <motion.div key={index}
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8,bounce:1,delay: 0.3*index }}
          className="educationItem"
          style={{ backgroundImage: `url(${item.img})` }}
        >
          <div className="eduBackgroundOverlay">
            <div className="eduContent">
              <h4 className="eduPeriod">{item.period}</h4>
              <div id='major'><p>{item.major}</p></div>
              <div id='title'><h3>{item.title}</h3></div>
              <div className="eduDetails">
                {item.details.map((detail, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    {detail.includes('<') ? (
                      <span dangerouslySetInnerHTML={{ __html: detail }} />
                    ) : (
                      detail
                    )}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>

        </motion.div>
      ))
      }
    </section >
  );
}

export default EducationSection;
