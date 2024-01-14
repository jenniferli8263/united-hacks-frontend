import React, {useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import {Button} from 'react-bootstrap';
import Goals from '../components/Goals';
import Goals2 from '../components/Goals2';
import Stats from '../components/Stats';
import {Container, Col, Row} from 'react-bootstrap';

const Dashboard = () => {
    const [input, setInput] = useState(""); 
    const [UUID, setUUID] = useState(""); 
    const [scheduleUUID, setScheduleUUID] = useState(""); 
    const [specificScheduleUUID, setSpecificScheduleUUID] = useState(""); 
    const [schedule, setSchedule] = useState([]); //general schedule with each month
    const [specificSchedule, setSpecificSchedule] = useState([]); //specific schedule with weeks (monthly)
    const [showButtons, setShowButtons] = useState(false);
    const [selectedTarget, setSelectedTarget] = useState([]); //the month that the user picked
    const [isLoading, setIsLoading] = useState(false);
    const [specificMonth, setSpecificMonth] = useState("");
    const [goal, setGoal] = useState(""); //the goal...input but rephrased?

    const writeToLocal = (uuid, data) =>{
        const existingData = JSON.parse(localStorage.getItem(uuid) || '[]');
        const updateData = [...existingData, data];

        // Step 3: Save updated data back to Local Storage
        localStorage.setItem(uuid, JSON.stringify(updateData));
        console.log("Saved data!");
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        setIsLoading(true);
        const modifiedInput = input.replace(/ /g, '+');
        fetch('https://api.pitrick.link/united-hacks/prompt?type=general&goal='+ modifiedInput)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSchedule(data.schedule);
                setSpecificSchedule("");
                setScheduleUUID(data.uuid);
                setSpecificScheduleUUID("");
                setShowButtons(true);
                writeToLocal(data.uuid, data);
            })
            .catch(error => console.error("Error: ", error))
            .finally(() => setIsLoading(false));
    }

    const getDetailedActions = (event) =>{
        console.log(selectedTarget);
        event.preventDefault();
        setIsLoading(true);
        //Example query parameters
        const month = selectedTarget.month;
        const goal = selectedTarget.goal;
        const activity = selectedTarget.activity;
        console.log(schedule, month, goal, activity);
        fetch('https://api.pitrick.link/united-hacks/prompt?type=month&goal=' + goal + '&activity=' + activity + '&month=' + month)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setSpecificSchedule(data.schedule);
            setSpecificScheduleUUID(data.uuid);
            setSpecificMonth(data.month);
            writeToLocal(data.uuid, data);
        })
        .catch(error => console.error("Error: ", error))
        .finally(() => setIsLoading(false));
    }

    const getDatabyUUID = (event) =>{
        event.preventDefault();
        setIsLoading(true);
        fetch('https://api.pitrick.link/united-hacks/fetch?uuid=' + UUID)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.success) {
                if(data.data.type === 'general') {
                    setSchedule(data.data.schedule);
                    setScheduleUUID(data.uuid);
                    setShowButtons(true);
                }
                else if(data.data.type === 'month') {
                    setSpecificSchedule(data.data.schedule);
                    setSpecificScheduleUUID(data.uuid);
                    setSpecificMonth(data.data.month);
                }
            }
        })
        .catch(error => console.error("Error: ", error))
        .finally(() => setIsLoading(false));
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
            
            <div className='ai'>
                <Container className = "grid">
                    <Row className="goal-row">
                        <Col>
                            <Sidebar/>
                        </Col>
                        
                        <Col>
                            <Goals2 
                            items={['Contact space agencies for information','Reach out to current or former astronauts for advice','lol','sjdjjed','hehehe','3','4','5','6']}
                            monthOrWeek = "Month"
                            />
                        </Col>
                        <Col>
                            <Stats monthOrWeek = "Month"/>
                        </Col>
                    </Row>
                </Container>

                <br/>
                {!scheduleUUID && (
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
                    <form onSubmit={getDatabyUUID}>
                        <label>or Enter the UUID: 
                            <input 
                                type="text" 
                                value={UUID}
                                style={{ width:"500px" }}
                                onChange={(e) => setUUID(e.target.value)}
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
                )}
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
                                <strong>Month:</strong> {item.month}, <strong>Activity:</strong> {item.activity}
                                </label>
                            </div>
                            ))}
                            {scheduleUUID && (<div>
                                <label><strong>Schedule UUID: </strong>{scheduleUUID}</label>
                                <Button variant="outline-primary" onClick={() => navigator.clipboard.writeText(scheduleUUID)} size="sm">Copy UUID</Button>{' '}
                                </div>)}
                        </form>
                        )}
                        {specificSchedule && (
                            <div>
                                <br></br><br></br>
                                <h3>{specificMonth}</h3>
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
                                {specificScheduleUUID && (<div>
                                    <label><strong>Monthly Schedule UUID: </strong>{specificScheduleUUID}</label>
                                    <Button variant="outline-primary" onClick={() => navigator.clipboard.writeText(specificScheduleUUID)} size="sm">Copy UUID</Button>{' '}
                                    </div>
                                )}
                            </div>
                        )}
                    {showButtons && (
                        <div>
                            <Button variant="primary" onClick={regenerate} disabled={isLoading}>Regenerate</Button>{' '}
                            <Button variant="primary" onClick={getDetailedActions} disabled={isLoading}>Get Detailed Actions</Button>{' '}
                            <Button variant="success" onClick={add} disabled={isLoading}>Add</Button>

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