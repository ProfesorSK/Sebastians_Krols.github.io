// src/components/Projects.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ModelViewer from './ModelViewer';

function Projects() {
  return (
    <Container className="py-5">
      <h2 className="mb-4">Projects</h2>
      <Row className="g-4">
        <Col md={4}>
          <ModelViewer modelPath="/models/model1.glb" title="Suspension Design" description="Optimized geometry for lateral grip and reduced scrub." />
        </Col>
        <Col md={4}>
          <ModelViewer modelPath="/models/model2.glb" title="Steering Rack Cover" description="Lightweight design machined from billet aluminum." />
        </Col>
        <Col md={4}>
          <ModelViewer modelPath="/models/model3.glb" title="Energy Device CAD" description="CAD for a thermodynamic testing rig with sensors." />
        </Col>
      </Row>
    </Container>
  );
}

export default Projects;
