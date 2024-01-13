import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate} from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    return(
        <div>
            <h1>Landing HEEHEE</h1>
            
            <Button 
            variant="contained"
            onClick={() => navigate("/Dashboard")}
            >
                Get Started
            </Button>
        
        </div>
    );
}

export default Landing;