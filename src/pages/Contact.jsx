import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Contact = () => {
  const navigate = useNavigate();
  
  // STATE: Defines the data structure for the form
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    message: ''
  });

  // HANDLER: Updates the state when any form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // HANDLER: Submits the form data to the backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Makes a POST request to the backend route '/api/contacts'
      await api.post('/contacts', formData);
      
      // Success feedback and redirection
      alert("Message sent! Redirecting to Home...");
      navigate('/');
    } catch (err) {
      console.error("API Submission Error:", err);
      alert("Failed to send message. Please check your backend is running and the '/contacts' route exists.");
    }
  };

  return (
    <Container className="py-5 mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Contact Me</h2>
      
      {/* START: Static contact details (fixed markdown issue) */}
      <div className="mb-4">
        <p>
          **You can also reach me directly at:**
        </p>
        <p className="mb-1">
          📧 **Email:** <a href="mailto:aakashkrmishra09@gmail.com">aakashkrmishra09@gmail.com</a>
        </p>
        <p className="mb-1">
          📞 **Phone:** (226) 978-4102
        </p>
        <p>
          🔗 **LinkedIn:** <a href="https://www.linkedin.com/in/aakash-mishra-574a52223/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/aakash-mishra-574a52223/</a>
        </p>
      </div>
      {/* END: Static contact details */}
      
      <h4 className="mb-3">Send Me a Message</h4>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstname" onChange={handleChange} required />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="lastname" onChange={handleChange} required />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleChange} required />
        </Form.Group>
        
        {/* Message field is correctly added back */}
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} name="message" onChange={handleChange} required />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Send Message
        </Button>
      </Form>
    </Container>
  );
};

export default Contact;