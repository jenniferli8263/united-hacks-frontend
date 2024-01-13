import React, {useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import {Button} from 'react-bootstrap';

const Dashboard = () => {
    const [input, setInput] = useState("");
    const [schedule, setSchedule] = useState([]);
    const [specificSchedule, setSpecificSchedule] = useState([]);
    const [showButtons, setShowButtons] = useState(false);
    const [selectedTarget, setSelectedTarget] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) =>{
        event.preventDefault();
        setIsLoading(true);
        const modifiedInput = input.replace(/ /g, '+');
        fetch('https://api.pitrick.link/united-hacks/prompt'+'?type=general' + '&goal='+ modifiedInput)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const scheduleData = data.schedule;
                setSchedule(scheduleData);
                setShowButtons(true);
            })
            .catch(error => console.error("Error: ", error))
            .finally(() => setIsLoading(false));
    }

    const getDetailedActions = (event) =>{
        console.log(selectedTarget);
        event.preventDefault();

        //Example query parameters
        const month = selectedTarget.month;
        const goal = selectedTarget.target;
        const activity = selectedTarget.activity;
        fetch('https://api.pitrick.link/united-hacks/prompt'+'?type=month' + '&goal=' + goal + '&activity=' + activity + '&month=' + month)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setSpecificSchedule(data.schedule);
        })
        .catch(error => console.error("Error: ", error));
            
        
    }

    const regenerate = (event) =>{
        console.log('regenerate');
        handleSubmit(event);
    }

    const add = () =>{
        console.log("add");
        setSchedule([]);
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
                    {isLoading && (
                        <>
                            Loading...
                        </>
                    )}
                </div>
                <br/>
                <div className = "ai-output">
                    <h3>Ai-Output:</h3>    
                    {schedule && (
                        <form>
                            {schedule.map((item, index) => (
                            <div key={index}>
                                <input
                                type="radio"
                                id={`radio-${index}`}
                                name="scheduleRadio"
                                onChange={()=>setSelectedTarget(item)}
                                // You can set other attributes or event handlers if needed
                                />
                                <label htmlFor={`radio-${index}`}>
                                <strong>Month:</strong> {item.month}, <strong>Activity:</strong> {item.activity}, <strong>Target:</strong> {item.target}
                                </label>
                            </div>
                            ))}
                        </form>
                        )}
                        {specificSchedule && (
                            <div>
                                <br></br><br></br>
                                <h3>{specificSchedule.month}</h3>
                                <ul>
                                    {specificSchedule.map((item, index) => (
                                        <li key={index}>
                                            <strong>Week {item.week[4]}</strong> <br></br>
                                            <strong>Activity:</strong>
                                            <ul>
                                                {item.activity.map((item, index) => (
                                                <li key={index}>{item}</li>  
                                                ))}
                                            </ul>
                    
                                            <strong>Goals:</strong> 
                                            <ul>
                                                {item.goal.map((item, index) => (
                                                <li key={index}>{item}</li>  
                                                ))}
                                            </ul>
                                        </li>
                                ))}
                                </ul>
                            </div>
                        )}
                    {showButtons && (
                        <div>
                            <Button variant="primary" onClick={regenerate}>Regenerate</Button>{' '}
                            <Button variant="primary" onClick={getDetailedActions}>Get Detailed Actions</Button>{' '}
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