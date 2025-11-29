import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const ServiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState({ title: '', description: '' });

  useEffect(() => {
    if (id) {
      api.get(`/services/${id}`)
         .then(res => setService(res.data))
         .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => setService({ ...service, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await api.put(`/services/${id}`, service);
      else await api.post('/services', service);
      navigate('/services');
    } catch (err) { alert('Error saving service'); }
  };

  return (
    <Container className="mt-5 pt-5">
      <h2>{id ? 'Edit Service' : 'Add New Service'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Service Title</Form.Label>
          <Form.Control type="text" name="title" value={service.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={service.description} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">Save Service</Button>
      </Form>
    </Container>
  );
};

export default ServiceForm;