// src/components/Projects.jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Projects() {
  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Projects</h2>
      <Row className="g-5 text-center">
        <Col md={4}>
          <h5>Suspension Geometry</h5>
          <p className="text-muted">View the optimized suspension system in 3D.</p>
          <Link to="/viewer?model=model1.glb">
            <Button variant="dark">View Model</Button>
          </Link>
        </Col>
        <Col md={4}>
          <h5>Steering Rack Cover</h5>
          <p className="text-muted">A machined aluminum steering rack prototype.</p>
          <Link to="/viewer?model=model2.glb">
            <Button variant="dark">View Model</Button>
          </Link>
        </Col>
        <Col md={4}>
          <h5>Testing Rig CAD</h5>
          <p className="text-muted">Assembly for a thermodynamic test rig.</p>
          <Link to="/viewer?model=model3.glb">
            <Button variant="dark">View Model</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Projects;
