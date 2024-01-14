import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Typed from 'typed.js';

const TypedEffect = () => {
    const el = useRef(null);

    useEffect(() => {
      const typed = new Typed(el.current, {
        strings: [
          "Exercise for 30 minutes, three times a week",
          "Read one book every two months",
          "Take a 10-minute break every hour at work",
          "Write a gratitude journal entry every evening",
          "Learn a new recipe and cook it monthly",
          "Start a daily 15-minute meditation practice",
          "Create a weekly to-do list and prioritize tasks",
          "Connect with a friend or family member each week",
          "Limit screen time to one hour before bedtime",
          "Save 10% of monthly income in a savings account",
          "Volunteer for a local charity once a month",
          "Plan a weekend getaway every quarter",
          "Set boundaries for work and personal time",
          "Enroll in a short online course each quarter",
          "Switch off devices for an hour every day",
          "Declutter one area of the home each month",
          "Express gratitude verbally to someone daily",
          "Try a new outdoor activity every month",
          "Review and adjust budget monthly",
          "Practice forgiveness and let go of grudges",
          "Join a social or hobby group in the community",
          "Replace one unhealthy habit with a healthy one",
          "Organize and clean out digital files quarterly",
          "Learn a new skill relevant to career goals",
          "Schedule a tech-free weekend retreat annually",
          "Capture and cherish a joyful moment daily",
          "Explore plant-based meals once a week",
          "Create a monthly budget and stick to it",
          "Attend a workshop or seminar every six months",
          "Practice a daily digital detox for 30 minutes",
          "Document achievements and celebrate milestones",
          "Visit a museum or art gallery monthly",
          "Prioritize 7-8 hours of sleep each night",
          "Learn to play a simple musical instrument",
          "Plan a long weekend off every quarter",
          "Start a daily stretching routine for flexibility",
          "Explore a new neighborhood or park monthly",
          "Schedule a monthly 'me time' for relaxation",
          "Practice mindful breathing for five minutes daily",
          "Learn basic financial literacy principles",
          "Attend a local community event every month",
          "Establish a morning routine for a productive day",
          "Send a thoughtful message to a friend weekly",
          "Implement a weekly digital detox day",
          "Automate monthly savings contributions",
          "Assist a neighbor with a task or errand monthly",
          "Experiment with a new cooking ingredient each week",
          "Create a vision board for personal goals",
          "Explore career development opportunities quarterly",
          "Schedule regular family game or movie nights",
          "Try a new type of cuisine or restaurant monthly",
          "Create a plan to pay off any outstanding debts",
          "Contribute to a green initiative monthly",
          "Plan a staycation or day trip every season",
          "Set realistic monthly fitness goals",
          "Attend a local networking event quarterly",
          "Engage in a random act of kindness weekly",
          "Implement a weekly planning session for tasks",
          "Try a new form of creative expression monthly",
          "Plan a monthly budget review and adjustment",
          "Set aside time for a monthly self-assessment",
          "Experiment with a new workout routine monthly",
          "Create a weekly meal plan for healthier eating",
          "Learn basic self-defense techniques",
          "Initiate a weekly family or friend catch-up call",
          "Explore a new podcast or TED Talk weekly",
          "Set aside time for a monthly technology-free day",
          "Start a daily journaling practice for reflection",
          "Practice mindful eating by savoring each bite"], // Strings to display
        // Speed settings, try diffrent values untill you get good results
        startDelay: 300,
        typeSpeed: 25,
        backSpeed: 0,
        backDelay: 100,
        fadeOut: true,
        shuffle: true,
        loop: true
      });
  
      // Destropying
      return () => {
        typed.destroy();
      };
    }, []);

    return (
        <div>
          <span style={{fontSize:'35px', color: '#33FFBD'}}>In the New Year of 2024,</span>
          <br />
          <span style={{fontSize:'35px', color: '#33FFBD'}}>I want to </span>
          <span ref={el} style={{fontSize:'45px', color: '#D633FF', fontWeight: 'bold'}}></span>
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
            <h1 style={{fontSize:'100px'}}>Smart Schedule</h1>
            <TypedEffect />
            <Button variant="contained" onClick={() => navigate("/Dashboard")} size='large'>
              Plan Your 2024 →
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
