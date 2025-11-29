import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api';

// Receive onLogin prop
const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/signin', formData);
      
      // Save token
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      
      // Update App state immediately
      onLogin(); 
      
      // Redirect smoothly
      navigate('/');
      
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <Container className="mt-5 pt-5" style={{ maxWidth: '500px' }}>
      <h2>Sign In</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">Sign In</Button>
      </Form>
    </Container>
  );
};

export default Login;