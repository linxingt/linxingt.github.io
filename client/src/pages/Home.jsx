import { useEffect, useState } from 'react';

import About from '../components/sections/AboutSection';
import Education from '../components/sections/EducationSection';
import Skills from '../components/sections/SkillsSection';
import Projects from '../components/sections/ProjectsSection';
import Experience from '../components/sections/ExperienceSection';
import Hobbies from '../components/sections/HobbiesSection';
import FullScreenLoader from '../components/FullScreenLoader';
import helloAnimation from '../assets/helloAnim.lottie';
import './styles/Home.scss';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [imgOk, setImgOk] = useState(false);
  
  useEffect(() => {
    const backupTimer = setTimeout(() => {if (imgOk) setLoading(false);}, 2000);
    if (imgOk && !loading) return;
    return () => clearTimeout(backupTimer);
  }, [imgOk]);

  return (
    <div className="homeContainer">
      <About setImg={setImgOk}/>
      <Education />
      <Skills />
      <Projects />
      <Experience />
      <Hobbies />
      {loading && <FullScreenLoader src={helloAnimation} speed={2}/>}
    </div>
  );
}

export default Home;