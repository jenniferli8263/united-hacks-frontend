import React from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
    const [input, setInput] = React.useState("");
    const [schedule, setSchedule] = React.useState("");

    const handleSubmit = (event) =>{
        event.preventDefault();
        const modifiedInput = input.replace(/ /g, '+');
        fetch('https://api.pitrick.link/united-hacks/prompt'+'?goal='+modifiedInput)
            .then(response => response.json())
            .then(data => {
                const scheduleData = data.schedule;
                setSchedule(scheduleData);
            })
            .catch(error => console.error("Error: ", error));
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
                </div>
                <br />
                <br />
                <br />
            </div>
        </div>
    );
}

export default Dashboard;