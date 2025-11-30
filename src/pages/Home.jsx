import React from 'react';

import { Container, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';



const Home = () => {

  return (

    <div className="d-flex align-items-center justify-content-center text-center vh-100 bg-light">

      <Container>

        <h1 className="display-3">Welcome to My Portfolio</h1>

        <p className="lead">

          This is Aakash Kumar Mishra

            and this portfolio bridges my student journey with my professional aspirations

            — feel free to explore my work and reach out for collaborations.

             Mission Statement: “Once a mechanical engineer, now crafting intelligence through software.”

        </p>

        <br />

        <Button variant="primary" size="lg" as={Link} to="/about">

          Learn More About Me

        </Button>

      </Container>

    </div>

  );

};



export default Home;