import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Restored useNavigate
import { FaShoePrints } from 'react-icons/fa'; // Footprint Icon

// Receive props from App.js
const MyNavbar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate(); // Restored useNavigate

  // Restored the dedicated handler for logout logic
  const onLogoutClick = () => {
    handleLogout(); // Call the function from App.js
    navigate('/login'); // Navigate after calling the handler
  };

  // Helper function to render links with footprints
  const renderNavLink = (title, to) => (
    <Nav.Link as={Link} to={to} key={title} className="position-relative mx-3" style={{ color: '#4a2c2a' }}>
      <span style={{ position: 'relative', zIndex: 2 }}>{title}</span>
      <FaShoePrints className="footprints" />
    </Nav.Link>
  );

  return (
    <Navbar expand="lg" fixed="top" style={{ backgroundColor: '#dccfbc', borderBottom: '2px solid #4a2c2a' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontSize: '2rem', color: '#4a2c2a' }}>
          The Marauder's Map
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: '#4a2c2a' }} />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">

            {/* Render main navigation links with footprints */}
            {renderNavLink('Home', '/')}
            {renderNavLink('About', '/about')}
            {renderNavLink('Projects', '/projects')}
            {renderNavLink('Services', '/services')}
            {renderNavLink('Contact', '/contact')}

            {isLoggedIn ? (
              // LOGOUT: Uses the custom handler for redirection
              <Nav.Link onClick={onLogoutClick} className="btn border-0 text-danger" style={{ fontFamily: 'Homemade Apple', color: '#8b0000', fontWeight: 'bold' }}>
                Mischief Managed (Logout)
              </Nav.Link>
            ) : (
              // LOGIN & REGISTER: Restored Register link and styled the buttons
              <>
                <Nav.Link as={Link} to="/login" className="btn border-0 mx-2" style={{ fontFamily: 'Homemade Apple', color: '#4a2c2a' }}>
                  I Solemnly Swear (Login)
                </Nav.Link>
                <Nav.Link 
                   as={Link} to="/register" className="btn border-0" style={{ fontFamily: 'Homemade Apple', marginLeft: '10px' }}> The Sorting Hat (Register)
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;