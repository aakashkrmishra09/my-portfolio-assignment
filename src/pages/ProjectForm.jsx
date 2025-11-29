import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [project, setProject] = useState({
    title: '',
    description: '',
    completion: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      api.get(`/projects/${id}`)
        .then(res => {
          // Format date safely for the HTML input
          let dateStr = '';
          if (res.data.completion) {
             dateStr = res.data.completion.substring(0, 10);
          }
          setProject({
            title: res.data.title,
            description: res.data.description,
            completion: dateStr
          });
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Create a Clean Object (Sanitization)
    // We explicitly pick ONLY the fields we want to save.
    // We DO NOT include _id or __v here.
    const cleanData = {
      title: project.title,
      description: project.description
    };

    // 2. Handle Date Safely
    // Only add completion if it actually has a value. 
    // Sending "" (empty string) to a Date field causes a crash.
    if (project.completion) {
      cleanData.completion = project.completion;
    }

    try {
      if (id) {
        // Edit Mode
        await api.put(`/projects/${id}`, cleanData);
      } else {
        // Create Mode
        await api.post('/projects', cleanData);
      }
      navigate('/projects');
    } catch (err) {
      console.error("Failed to save:", err);
      setError('Error saving project. Please check the console.');
    }
  };

  return (
    <Container className="mt-5 pt-5">
      <h2>{id ? 'Edit Project' : 'Add New Project'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Project Title</Form.Label>
          <Form.Control 
            type="text" name="title" 
            value={project.title} onChange={handleChange} required 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" rows={3} name="description" 
            value={project.description} onChange={handleChange} required 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Completion Date</Form.Label>
          <Form.Control 
            type="date" name="completion" 
            value={project.completion} onChange={handleChange} 
          />
        </Form.Group>
        <Button variant="primary" type="submit">Save Project</Button>
      </Form>
    </Container>
  );
};

export default ProjectForm;