import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCode, FaRobot, FaDatabase, FaCogs, FaTasks, FaEdit, FaTrash } from 'react-icons/fa'; // Import icons
import api from '../api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  
  // Check login status
  const isLoggedIn = !!localStorage.getItem('token');

  const fetchServices = async () => {
    try {
      const res = await api.get('/services');
      setServices(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load services.");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await api.delete(`/services/${id}`);
      fetchServices(); // Refresh list
    } catch (err) {
      alert("Failed to delete service.");
    }
  };

  // Helper to pick a relevant icon
  const getIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('mern') || t.includes('web')) return <FaCode size={40} className="mb-3 text-primary"/>;
    if (t.includes('ai') || t.includes('bot')) return <FaRobot size={40} className="mb-3 text-success"/>;
    if (t.includes('data') || t.includes('sql')) return <FaDatabase size={40} className="mb-3 text-warning"/>;
    if (t.includes('erection') || t.includes('commissioning')) return <FaCogs size={40} className="mb-3 text-secondary"/>;
    if (t.includes('management') || t.includes('coordination')) return <FaTasks size={40} className="mb-3 text-info"/>;
    return <FaCode size={40} className="mb-3 text-dark"/>; // Default
  };

  return (
    <Container className="py-5 mt-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="fw-bold">Services I Offer</h2>
        {isLoggedIn && (
          <Button as={Link} to="/services/add" variant="success">Add Service</Button>
        )}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {services.map((s) => (
          <Col md={6} lg={4} key={s._id} className="mb-4">
            <Card className="h-100 border-0 shadow-sm hover-card" style={{ transition: 'all 0.3s ease' }}>
              <Card.Body className="text-center p-4">
                {/* 1. The Icon */}
                {getIcon(s.title)}
                
                {/* 2. The Title */}
                <Card.Title className="fw-bold mb-3">{s.title}</Card.Title>
                
                {/* 3. The Description */}
                <Card.Text className="text-muted text-start">
                  {s.description}
                </Card.Text>

                {/* 4. Admin Buttons (Only if logged in) */}
                {isLoggedIn && (
                  <div className="d-flex justify-content-center gap-2 mt-4 pt-3 border-top">
                    <Button as={Link} to={`/services/edit/${s._id}`} variant="outline-warning" size="sm">
                      <FaEdit /> Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(s._id)}>
                      <FaTrash /> Delete
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Services;