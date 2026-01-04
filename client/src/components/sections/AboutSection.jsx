import './styles/About.scss';

import me from '../../assets/me.jpg';

const AboutSection = () => {
  return (
    <section className='aboutSection' id='about'>
      <div className='imageContainer'>
        <img src={me} className='aboutImage' />
        <p className="overlayText">
          Je m'appelle <strong>LIN Xingtong</strong>.<br />
          Je suis origine chinoise et je suis arrivée en France en octobre 2017.<br /><br />
          J'étudie actuellement en école d'ingénieurs à <b>ESIEE Paris</b>, dans la filière <strong>Développement Informatique</strong>.
        </p>
      </div>
      <div className='aboutContent'>
          <p>
            Je me décrirais comme une personne sympathique, curieuse, et <span className='mark'>toujours désireuse d'apprendre</span> et de s'améliorer.<br />
            Au cours de mes stages et projets passés, on m'a souvent félicitée pour la <span className='yellowPen'>rapidité et la qualité</span> de mon travail.</p>

          <ul>Vous trouverez sur mon e-portfolio : mon parcours académique, mes compétences techniques, mes projets réalisés, ainsi que mes centres d'intérêt.</ul>

          <p>Si vous avez des questions ou souhaitez simplement me laisser un message, n'hésitez pas à m'écrire via l'ongle dédié ou par email.
          </p>
          <p><b>BIENVENUE DANS MON UNIVERS !</b></p>
      </div>
    </section>
  );
}
export default AboutSection;
