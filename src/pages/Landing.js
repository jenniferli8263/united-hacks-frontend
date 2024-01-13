import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';

const Landing = () => {
    const navigate = useNavigate();
    return(
        <div className="landing">
            <Container>
                <Row>
                    <Col>
                        <h1>UnitedHacks</h1>
                        <h3>Blah blah blah UnitedHacks is great</h3>
                        <Button 
                        variant="contained"
                        onClick={() => navigate("/Dashboard")}
                        >
                            Get Started
                        </Button>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        
        </div>
    );
}

export default Landing;