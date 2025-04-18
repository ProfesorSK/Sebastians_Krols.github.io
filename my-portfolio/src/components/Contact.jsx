// src/components/Contact.js
import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function Contact() {
  return (
    <Container className="py-5">
      <h2 className="mb-4">Contact</h2>
      <p>Let’s get in touch! You can reach me via the form below or email me directly at:</p>
      <p><strong>sebastians.krols@gmail.com</strong></p>

      <Form action="https://formspree.io/f/your-form-id" method="POST">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="_replyto" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" name="message" rows={4} required />
        </Form.Group>
        <Button type="submit" variant="primary">Send</Button>
      </Form>
    </Container>
  );
}

export default Contact;
