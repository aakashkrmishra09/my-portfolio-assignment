import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="d-flex align-items-center justify-content-center text-center vh-100" 
         // Adds faint line pattern to the parchment background
         style={{ 
           backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(74,44,42,0.05) 10px, rgba(74,44,42,0.05) 20px)' 
         }}>
      <Container style={{ border: '4px double #4a2c2a', padding: '50px', maxWidth: '800px' }}>
        
        {/* The main title, using the Satisfy handwritten font */}
        <h1 className="display-1 mb-4" style={{ fontFamily: 'Satisfy' }}>Messrs. Moony, Wormtail, Padfoot, and Prongs</h1>
        <h2 className="mb-4">Purveyors of Aids to Magical Mischief-Makers<br/>are proud to present</h2>
        
        {/* Personalized Portfolio Title (Wavy Underline) */}
        <h1 className="display-3 mb-4" style={{ textDecoration: 'underline', textDecorationStyle: 'wavy' }}>
          AAKASH KUMAR MISHRA'S PORTFOLIO
        </h1>

        {/* Mission Statement from old code, themed */}
        <p className="lead mb-5">
            Mission Statement: “Once a mechanical engineer, now crafting intelligence through software.”
        </p>

        {/* Themed Navigation Buttons */}
        <div className="d-flex justify-content-center gap-4">
          <Button as={Link} to="/projects" size="lg">
            Reveal Secrets (Projects)
          </Button>
          <Button as={Link} to="/about" size="lg">
            Identify User (About)
          </Button>
        </div>
        
        {/* Thematic Note */}
        <p className="mt-5 text-muted" style={{ fontFamily: 'Homemade Apple' }}>
          *Tap the footprints to navigate the castle...
        </p>
      </Container>
    </div>
  );
};

export default Home;