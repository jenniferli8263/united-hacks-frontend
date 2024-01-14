import React, {useState, useEffect} from 'react';
import SidebarItem from '../components/SidebarItem';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Goals from '../components/Goals';
import Goals2 from '../components/Goals2';
import Stats from '../components/Stats';
import {Container, Col, Row} from 'react-bootstrap';
import items from "../data/sidebar.json"

const Dashboard = () => {
    const [input, setInput] = useState(""); 
    const [UUID, setUUID] = useState(""); 
    const [scheduleUUID, setScheduleUUID] = useState(""); 
    const [specificScheduleUUID, setSpecificScheduleUUID] = useState(""); 
    const [schedule, setSchedule] = useState([]); //general schedule with each month
    const [specificSchedule, setSpecificSchedule] = useState([]); //specific schedule with weeks (monthly)
    const [selectedTarget, setSelectedTarget] = useState([]); //the month that the user picked
    const [isMonthSelected, setIsMonthSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTask, setCurrentTask] = useState("");
    const [specificMonth, setSpecificMonth] = useState("");
    
    /*Updating the goals and stats*/
    const [taskData, setTaskData] = useState([]); //A list of tasks to display
    const [monthLabel, setMonthLabel] = useState(""); //E.g. Goals for {monthLabel}
    const [weekLabel, setWeekLabel] = useState("");

    const generalTaskUpdate = (month, goals) => {
        setMonthLabel(month);
        setTaskData(goals);
    }

    const specificTaskUpdate = (week, goals) => {
        setWeekLabel(week);
        setTaskData(goals);
    }


    const writeToLocal = (uuid, data) =>{
        const existingData = JSON.parse(localStorage.getItem(uuid) || '[]');
        const updateData = [...existingData, data];
        const stringData = JSON.stringify(updateData);
        localStorage.setItem(uuid, stringData);

        console.log("Saved data: "+ stringData);
    }

    
    const handleSubmit = (event) =>{
        event.preventDefault();
        setIsLoading(true);
        setCurrentTask("generate_schedule");
        generateByResolution();
    }

    const generateByResolution = () => {
        const modifiedInput = input.replace(/ /g, '+');
        fetch('https://api.pitrick.link/united-hacks/prompt?type=general&goal='+ modifiedInput)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSchedule(data.schedule);
                setIsMonthSelected(false);
                setSpecificSchedule("");
                setScheduleUUID(data.uuid);
                setSpecificScheduleUUID("");
                writeToLocal(data.uuid, data);
            })
            .catch(error => console.error("Error: ", error))
            .finally(() => setIsLoading(false));
    }

    const getDetailedActions = (event) =>{
        console.log(selectedTarget);
        event.preventDefault();
        setIsLoading(true);
        setCurrentTask("generate_detailed_schedule");
        generateDetailedSchedule();
        
    }

    const generateDetailedSchedule = () => {
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
        .finally(() => {setIsLoading(false); setCurrentTask("");});
    }

    const getDatabyUUID = (event) =>{
        event.preventDefault();
        setIsLoading(true);
        setCurrentTask("fetch_by_uuid");
        fetch('https://api.pitrick.link/united-hacks/fetch?uuid=' + UUID)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.success) {
                if(data.data.type === 'general') {
                    setSchedule(data.data.schedule);
                    setIsMonthSelected(false);
                    setInput(data.data.goal);
                    setScheduleUUID(data.uuid);
                }
                else if(data.data.type === 'month') {
                    setSpecificSchedule(data.data.schedule);
                    setSpecificScheduleUUID(data.uuid);
                    setSpecificMonth(data.data.month);
                }
            }
        })
        .catch(error => console.error("Error: ", error))
        .finally(() => {setIsLoading(false); setCurrentTask("");});
    }

    const regenerateSchedule = (event) =>{
        console.log('regenerate');
        setIsLoading(true);
        setCurrentTask("regenerate_schedule");
        generateByResolution();
    }

    const regenerateSpecificSchedule = (event) =>{
        console.log('regenerate');
        setIsLoading(true);
        setCurrentTask("regenerate_detailed_schedule");
        generateDetailedSchedule();
    }
        
    return(
        <div >
            
            <div className='ai'>
                <Container className = "grid">
                    <Row className="goal-row">
                        <Col>
                            {/* <Sidebar
                                onMonthChange={generalTaskUpdate}
                                onWeekChange={specificTaskUpdate}
                            /> */}
                            <div className="sidebar">
                                { items.map((item, index) => <SidebarItem key={index} item={item} onMonthChange={generalTaskUpdate} onWeekChange={specificTaskUpdate}/>) }
                            </div>
                        </Col>
                        
                        <Col>
                            <Goals2 
                            items={taskData}
                            monthOrWeek = {weekLabel === "" ? "Month" : "Week"}
    
                            />
                        </Col>
                        <Col>
                            <Stats monthOrWeek = {weekLabel === "" ? "Month" : "Week"}/>
                        </Col>
                    </Row>
                </Container>

                <br/>
                {!scheduleUUID && (
                <div className = "resolution-input">
                    <Tabs
                    defaultActiveKey="resolution"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    >
                        <Tab eventKey="resolution" title="Generate by Resolution">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formResolution">
                                    <Form.Label>Generate New Schedule by Resolution</Form.Label>
                                    <Form.Control type="text" placeholder="Your New Year Resolution" value={input} onChange={(e) => setInput(e.target.value)}/>
                                </Form.Group>
                                <Button variant="primary" type="submit" disabled={isLoading}>
                                    {!(isLoading && currentTask==="generate_schedule")&&(<span>Generate</span>)}
                                    {(isLoading && currentTask==="generate_schedule")&&(
                                    <div>
                                        <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />
                                        <span>Generating</span>
                                    </div>
                                    )}
                                </Button>
                            </Form>
                        </Tab>
                        <Tab eventKey="uuid" title="Fetch by UUID">
                            <Form onSubmit={getDatabyUUID}>
                                <Form.Group className="mb-3" controlId="formUUID">
                                    <Form.Label>Fetch Previously Generated Schedule by UUID</Form.Label>
                                    <Form.Control type="text" placeholder="UUID" value={UUID} onChange={(e) => setUUID(e.target.value)}/>
                                </Form.Group>
                                <Button variant="primary" type="submit" disabled={isLoading}>
                                    {!(isLoading && currentTask==="fetch_by_uuid")&&(<span>Fetch</span>)}
                                    {(isLoading && currentTask==="fetch_by_uuid")&&(
                                    <div>
                                        <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />
                                        <span>Fetching</span>
                                    </div>
                                    )}
                                </Button>
                            </Form>
                        </Tab>
                    </Tabs>
                </div>
                )}
                <br/>
                <div className = "ai-output">  
                    {schedule.length>0 && (
                        <Card border='primary' style={{margin: '10px'}}>
                            <Card.Header>
                                Generated Schedule
                            </Card.Header>
                            <Card.Body>
                            <Form>
                            {schedule.map((item, index) => (
                                <div key={index} className="mb-3">
                                <Form.Check
                                    type='radio'
                                    id={`radio-${index}`}
                                    name="scheduleRadio"
                                    label={`${item.month} Activity: ${item.activity}, Goal: ${item.goal}`}
                                    onChange={()=>{setSelectedTarget(item); setIsMonthSelected(true);}}
                                    disabled={isLoading}
                                />
                                </div>
                            ))}
                            </Form>
                            <label><strong>Resolution: </strong>{input}</label>
                            <br />
                            <label><strong>Schedule UUID: </strong>{scheduleUUID}</label>
                            <br />
                            <Button variant="outline-warning" onClick={regenerateSchedule} disabled={isLoading} size="sm">
                                {!(isLoading && currentTask==="regenerate_schedule")&&(<span>Regenerate Schedule</span>)}
                                {(isLoading && currentTask==="regenerate_schedule")&&(
                                    <div>
                                        <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />
                                        <span>Regenerating</span>
                                    </div>
                                )}
                            </Button>{' '}
                            <Button variant="outline-primary" onClick={getDetailedActions} disabled={isLoading||!isMonthSelected} size="sm">
                                {!(isLoading && currentTask==="generate_detailed_schedule")&&(<span>Generate Detailed Schedule for {selectedTarget.month}</span>)}
                                {(isLoading && currentTask==="generate_detailed_schedule")&&(
                                    <div>
                                        <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />
                                        <span>Generating</span>
                                    </div>
                                )}
                            </Button>{' '}
                            <Button variant="outline-info" onClick={() => navigator.clipboard.writeText(scheduleUUID)} size="sm">Copy Schedule UUID</Button>{' '}
                            </Card.Body>
                            
                        </Card>
                        )}
                        {specificSchedule.length>0 && (
                            <Card style={{margin: '10px'}}>
                                <Card.Header>
                                    Generated Detailed Monthly Schedule for {specificMonth}
                                </Card.Header> 
                                <Card.Body>
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
                                    <label><strong>Monthly Schedule UUID: </strong>{specificScheduleUUID}</label>
                                    <br />
                                    <Button variant="outline-warning" onClick={regenerateSpecificSchedule} disabled={isLoading} size="sm">
                                    {!(isLoading && currentTask==="regenerate_detailed_schedule")&&(<span>Regenerate Detailed Schedule</span>)}
                                    {(isLoading && currentTask==="regenerate_detailed_schedule")&&(
                                        <div>
                                            <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            />
                                            <span>Regenerating</span>
                                        </div>
                                    )}
                                    </Button>{' '}
                                    <Button variant="outline-info" onClick={() => navigator.clipboard.writeText(specificScheduleUUID)} size="sm">Copy Detailed Schedule UUID</Button>{' '}
                                </Card.Body>
                            </Card>
                        )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;