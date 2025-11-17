
import About from '../components/sections/AboutSection';
import Education from '../components/sections/EducationSection';
import Skills from '../components/sections/SkillsSection';
import Projects from '../components/sections/ProjectsSection';
import Experience from '../components/sections/ExperienceSection';
// import Hobbies from '../components/sections/HobbiesSection';
// import Footer from '../components/sections/Footer';


const Home = () => {
  return (
    <>
      <About />
      <Education />
      <Skills />
      <Projects />
      <Experience />
      {/* <Hobbies /> */}
      {/* <Footer /> */}
    </>
  );
}

export default Home;