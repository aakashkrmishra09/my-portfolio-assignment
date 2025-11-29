import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import profilePic from '../assets/profile.jpg';
import resume from '../assets/resume.pdf';

const About = () => {
  return (
    <Container className="py-5 mt-5">
      <h2 className="mb-4">About Me</h2>
      <Row className="align-items-center">
        <Col md={4}>
          <img src={profilePic} alt="Me" className="img-fluid rounded-circle shadow" />
        </Col>
        <Col md={8}>
          <h3>Aakash Kumar Mishra</h3>
          <p>
            I started my journey as a Mechanical Engineer, 
            where I learned the importance of precision, 
            problem-solving, and structured thinking. 
            While I loved working with machines and systems, 
            my curiosity gradually shifted toward the digital world
             how software and artificial intelligence can transform industries 
             and solve complex challenges.

Today, I’m pursuing a new path as a Software Engineering & AI learner, 
building on my engineering foundation to explore the future of technology.
 My mission is to combine the discipline of engineering 
 with the innovation of AI to create smarter, impactful solutions.

Outside of academics and tech, 
I value growth, adaptability, and exploration, 
whether it’s through reading, problem-solving, or trying something completely new.
          </p>
          <a href={resume} target="_blank" rel="noreferrer">
             <Button variant="outline-dark">Download My Resume (PDF)</Button>
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default About;