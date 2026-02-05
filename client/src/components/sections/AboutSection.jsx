import { motion } from "motion/react";
import { useWindowSize } from '../../hooks/useWindowSize';

import me from '../../assets/me.webp';
import me2 from '../../assets/me2.webp';

import './styles/About.scss';

const AboutSection = ({ setImg }) => {
  const { isMobile, isLargeDesktop } = useWindowSize();
  const Nom = () => (
    <p>
      Je m'appelle <strong>LIN Xingtong</strong>.
    </p>
  );
  const Pres = () => (
    <p>
      Je suis d'origine chinoise et je suis arrivée en France en octobre 2017.<br /><br />
      J'étudie actuellement en école d'ingénieurs à <b>ESIEE Paris</b>, dans la filière <strong>Développement Informatique</strong>.
    </p>
  );

  return (
    <section className='aboutSection' id='about'>
      <div className='imageContainer'>
        <img src={isLargeDesktop ? me2 : me} className='aboutImage' onLoad={()=>setImg(true)} />
        {isMobile &&
          <div className='showPhone'><Nom /></div>
        }
        {!isLargeDesktop &&
          <div className="overlayText">
            {!isMobile && <Nom />}<Pres />
          </div>
        }
      </div>
      <div className='aboutContent'>
        {isLargeDesktop && <><Nom /><Pres /></>}
        <p>
          Je me décrirais comme une personne sympathique, curieuse, et <span className='mark'>toujours désireuse d'apprendre</span> et de s'améliorer.<br />
          Au cours de mes stages et projets passés, on m'a souvent félicitée pour la <span className='yellowPen'>rapidité et la qualité</span> de mon travail.
        </p>
        <p>Vous trouverez sur mon e-portfolio : <br />mon parcours académique, mes compétences techniques, mes projets réalisés, ainsi que mes centres d'intérêt.</p>
        <p>Si vous avez des questions ou souhaitez simplement me laisser un message, n'hésitez pas à m'écrire via l'ongle dédié ou par email.</p>
        <motion.div
          className='overlaySticker'
          initial={{ x: -40, opacity: 0, rotate: -40 }}
          whileInView={{ x: [null, 90, -40, 30, -20, 10, 0], opacity: 1, rotate: [null, 100, -80, 60, -30, 15, 0]}}
          viewport={{ once: false }}
          transition={{
            type: "spring",
            bounce: 0.9,
            duration: 1.5,
            delay: 0.3
          }}
        >
          <h4>BIENVENUE DANS MON UNIVERS !</h4>
        </motion.div>
      </div>
    </section>
  );
}
export default AboutSection;
