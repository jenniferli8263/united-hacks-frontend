import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Typed from 'typed.js';

const TypedEffect = () => {
    const el = useRef(null);

    useEffect(() => {
      const typed = new Typed(el.current, {
        strings: ["Learn How to Cook", "Find a Co-op Job", "Have a Healthy Body", "Become a Youtuber", "Sleep More", "Travel Around t"], // Strings to display
        // Speed settings, try diffrent values untill you get good results
        startDelay: 300,
        typeSpeed: 50,
        backSpeed: 0,
        backDelay: 100,
        fadeOut: true,
        loop: true
      });
  
      // Destropying
      return () => {
        typed.destroy();
      };
    }, []);

    return (
        <div>
          <span style={{'font-size':'40px', 'color': '#33FFBD'}}>In the New Year of 2024,</span>
          <br />
          <span style={{'font-size':'40px', 'color': '#33FFBD'}}>I want to </span>
          <span ref={el} style={{'font-size':'55px', 'color': '#D633FF', 'font-weight': 'bold'}}></span>
        </div>
      );
}

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <Container>
        <Row>
            <Col>
            <h1 style={{'font-size':'100px'}}>Smart Schedule</h1>
            <TypedEffect />
            <Button variant="contained" onClick={() => navigate("/Dashboard")} size='large'>
              Get Started
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
