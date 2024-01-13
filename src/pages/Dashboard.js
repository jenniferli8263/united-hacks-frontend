import React, {useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import {Button} from 'react-bootstrap';

const Dashboard = () => {
    const [input, setInput] = useState("");
    const [schedule, setSchedule] = useState("");
    const [showButtons, setShowButtons] = useState(false);

    const handleSubmit = (event) =>{
        event.preventDefault();
        const modifiedInput = input.replace(/ /g, '+');
        fetch('https://api.pitrick.link/united-hacks/prompt'+'?goal='+modifiedInput)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const scheduleData = data.schedule;
                setSchedule(scheduleData);
                setShowButtons(true);
            })
            .catch(error => console.error("Error: ", error));
    }

    const regenerate = (event) =>{
        console.log('regenerate');
        handleSubmit(event);
    }

    const add = () =>{
        console.log("add");
        setSchedule("");
        setShowButtons(false);
    }
        
    return(
        <div >
            <Sidebar/>
            <div className='ai'>
                <br/>
                <div className = "resolution-input">
                    <form onSubmit={handleSubmit}>
                        <label>Enter your resolution:
                            <input 
                                type="text" 
                                value={input}
                                style={{ width:"500px" }}
                                onChange={(e) => setInput(e.target.value)}
                                />
                        </label>
                        <input type="submit" />
                    </form>
                </div>
                <br/>
                <div className = "ai-output">
                    <h3>Ai-Output:</h3>    
                    {schedule && (
                        <ul>
                            {schedule.map((item, index) => (
                            <li key={index}>
                                <strong>Month:</strong> {item.month}, <strong>Activity:</strong> {item.activity}, <strong>Target:</strong> {item.target}
                            </li>
                            ))}
                        </ul>
                        )}
                    {showButtons && (
                        <div>
                            <Button variant="primary" onClick={regenerate}>Regenerate</Button>{' '}
                            <Button variant="success" onClick={add}>Add</Button>
                        </div>
                    )}
                </div>
                <br />
                <br />
                <br />
            </div>
        </div>
    );
}

export default Dashboard;