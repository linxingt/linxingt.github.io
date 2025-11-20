
import About from '../components/sections/AboutSection';
import Education from '../components/sections/EducationSection';
import Skills from '../components/sections/SkillsSection';
import Projects from '../components/sections/ProjectsSection';
import Experience from '../components/sections/ExperienceSection';
import Hobbies from '../components/sections/HobbiesSection';
import './styles/Home.scss';

const Home = () => {
  return (
    <div className="homeContainer">
        <div className="backgroundImage" />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Experience />
        <Hobbies />
    </div>
  );
}

export default Home;