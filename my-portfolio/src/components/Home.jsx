// src/components/Home.jsx
import React from 'react';
import Navbar from './Navbar.jsx';
import About from './About.jsx';
import Projects from './Projects.jsx';
import Contact from './Contact.jsx';

function Home() {
  return (
    <div>
      <Navbar />
      <section id="about" className="section">
        <About />
      </section>
      <section id="projects" className="section">
        <Projects />
      </section>
      <section id="contact" className="section">
        <Contact />
      </section>
    </div>
  );
}

export default Home;
