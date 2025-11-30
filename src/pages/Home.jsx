import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const Home = () => {
  return (
    // 1. Added paddingTop: '120px' to push everything down
    <div style={{ 
      position: 'relative', 
      minHeight: '100vh', 
      overflow: 'hidden',
      paddingTop: '120px' 
    }}>
      
      {/* BACKGROUND LOGO LAYER (Watermark) */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        backgroundImage: `url(${logo})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        opacity: 0.1,    
        zIndex: -1       
      }}></div>

      {/* Main Content */}
      <Container className="text-center">
        <Row className="justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <Col md={8}>
            <h1 className="display-3 fw-bold mb-4">Welcome to My Portfolio</h1>
            <p className="lead text-secondary mb-5">
              This is Aakash Kumar Mishra and this portfolio bridges my student journey with my professional aspirations — 
              feel free to browse my work and reach out for collaborations.
              <br/><br/>
              Mission Statement: "Once a mechanical engineer, now crafting intelligence through software."
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button variant="primary" size="lg" as={Link} to="/about">
                Learn More About Me
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;