// src/components/About.js
import React from 'react';
import { Container } from 'react-bootstrap';

function About() {
  return (
    <Container className="py-5">
      <h2 className="mb-4">About Me</h2>
      <p>
        Hi! I'm a mechanical engineer passionate about combining design, physics, and software.
        I love working on high-performance systems like Formula Student EVs, developing 3D models,
        and exploring how to bring engineering ideas to life with code and CAD.
      </p>
    </Container>
  );
}

export default About;
