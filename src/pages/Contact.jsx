import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaLinkedin, FaPaperPlane } from 'react-icons/fa'; // Icons
import api from '../api';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    message: '' // Ensure your backend Contact model supports 'message', or remove this field if not
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/contacts', formData);
      alert("Message sent! Redirecting to Home...");
      navigate('/');
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    }
  };

  return (
    <Container className="py-5 mt-5">
      <Card className="border-0 shadow-lg overflow-hidden" style={{ borderRadius: '15px' }}>
        <Row className="g-0">
          
          {/* LEFT SIDE: Contact Info Panel */}
          <Col md={5} className="bg-dark text-white p-5 d-flex flex-column justify-content-center">
            <h3 className="fw-bold mb-4">Let's Connect</h3>
            <p className="text-white-50 mb-5">
              I'm always open to discussing product design work or partnership opportunities.
            </p>
            
            <div className="d-flex align-items-center mb-4">
              <FaEnvelope className="me-3 text-primary" size={24} />
              <div>
                <small className="text-white-50 d-block">Email</small>
                <a href="mailto:aakashkrmishra09@gmail.com" className="text-white text-decoration-none fw-bold">
                  aakashkrmishra09@gmail.com
                </a>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <FaPhone className="me-3 text-success" size={24} />
              <div>
                <small className="text-white-50 d-block">Phone</small>
                <span className="fw-bold">(226) 978-4102</span>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <FaLinkedin className="me-3 text-info" size={24} />
              <div>
                <small className="text-white-50 d-block">LinkedIn</small>
                <a 
                  href="https://www.linkedin.com/in/aakash-mishra-574a52223/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white text-decoration-none fw-bold"
                >
                  View Profile
                </a>
              </div>
            </div>
          </Col>

          {/* RIGHT SIDE: Interactive Form */}
          <Col md={7} className="p-5 bg-white">
            <h2 className="mb-4 fw-bold text-dark">Send Me a Message</h2>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-secondary small fw-bold">FIRST NAME</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="firstname" 
                      onChange={handleChange} 
                      className="border-0 border-bottom rounded-0 px-0 shadow-none bg-light" 
                      placeholder="John" 
                      required 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-secondary small fw-bold">LAST NAME</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="lastname" 
                      onChange={handleChange} 
                      className="border-0 border-bottom rounded-0 px-0 shadow-none bg-light" 
                      placeholder="Doe" 
                      required 
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label className="text-secondary small fw-bold">EMAIL ADDRESS</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email" 
                  onChange={handleChange} 
                  className="border-0 border-bottom rounded-0 px-0 shadow-none bg-light" 
                  placeholder="john@example.com" 
                  required 
                />
              </Form.Group>

              {/* Added Message Field if your backend supports it, otherwise remove */}
              {/* <Form.Group className="mb-5">
                <Form.Label className="text-secondary small fw-bold">MESSAGE</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  name="message" 
                  onChange={handleChange} 
                  className="border-0 border-bottom rounded-0 px-0 shadow-none bg-light" 
                  placeholder="Write your message here..." 
                />
              </Form.Group> */}

              <div className="d-grid">
                <Button variant="dark" type="submit" size="lg" className="rounded-pill d-flex align-items-center justify-content-center gap-2">
                  <FaPaperPlane size={14} /> Send Message
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Contact;