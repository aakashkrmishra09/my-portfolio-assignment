import React from 'react';

import { Navbar, Nav, Container } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';





// Receive props from App.js

const MyNavbar = ({ isLoggedIn, handleLogout }) => {

  const navigate = useNavigate();



  const onLogoutClick = () => {

    handleLogout(); // Call the function from App.js

    navigate('/login');

  };



  return (

    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">

      <Container>

        <Navbar.Brand as={Link} to="/">

          <img src={logo} width="50" height="60" className="d-inline-block align-top" alt="Logo" />

          {' '}Aakash Kumar Mishra

        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ms-auto">

            <Nav.Link as={Link} to="/">Home</Nav.Link>

            <Nav.Link as={Link} to="/about">About</Nav.Link>

            <Nav.Link as={Link} to="/projects">Projects</Nav.Link>

            <Nav.Link as={Link} to="/services">Services</Nav.Link>

            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

           

            {isLoggedIn ? (

              <Nav.Link onClick={onLogoutClick} style={{cursor: 'pointer'}}>Logout</Nav.Link>

            ) : (

              <>

                <Nav.Link as={Link} to="/login">Login</Nav.Link>

                <Nav.Link as={Link} to="/register">Register</Nav.Link>

              </>

            )}

          </Nav>

        </Navbar.Collapse>

      </Container>

    </Navbar>

  );

};



export default MyNavbar;