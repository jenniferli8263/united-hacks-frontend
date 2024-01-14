import { useState } from "react";

export default function SidebarItem({item, onMonthChange, onWeekChange}){
    const [open, setOpen] = useState(false);

    function isAbbrev(abbrev, fullMonth) {
        // Convert both strings to lowercase for case-insensitive comparison
        const lowerAbbrev = abbrev.toLowerCase();
        const lowerFullMonth = fullMonth.toLowerCase();
    
        // Check if the fullMonth starts with the abbreviation
        return lowerFullMonth.startsWith(lowerAbbrev);
    }

    const handleClick = (selected, isMonth) => {
        // localStorage.clear();
        console.log("clicked!")
        if(isMonth){
            // for each item in local storage
            //      loop through each item - get it's value - convert it to object
            //      if the object has the property general, add it's activities to a list
            //      keep adding to the list for each item with general schedule
            
            // Step 1: Get all keys in local storage
            const keys = Object.keys(localStorage);
            console.log(keys);
            // Step 2: Loop through the keys
            keys.forEach(key => {
                if(key !== "loglevel"){
                // Step 3: Retrieve the value for each key
                    const storedData = localStorage.getItem(key);
                    console.log("THIS IS STORED DATA", storedData); 
                    // ^this is current just equal to INFO for some reason

                    // Step 4: Do something with the key-value pair
                    const parsedData = JSON.parse(storedData);
                    console.log(parsedData);
                    console.log("type: ", parsedData[0].type);
                    console.log("schedule: ", parsedData[0].schedule)
                    if(parsedData[0].type === 'general'){
                        // loop through parsedData.schedule - add the activites to activites array
                        
                        for(let i = 0; i < 12; i++){  
                            console.log("month", parsedData[0].schedule[i].month, selected)
                            if(isAbbrev(parsedData[0].schedule[i].month,selected)){
                                console.log("matched!", selected)
                                const result = [parsedData[0].schedule[i].activity]
                                onMonthChange(selected, result)
                            }
                        }
                    }
                }
                
            });

            console.log(typeof onMonthChange)
            // onMonthChange(selected, activities);
        }
        else{
            console.log(typeof onWeekChange)
            const keys = Object.keys(localStorage);
            console.log(keys);
            // Step 2: Loop through the keys
            keys.forEach(key => {
                if(key !== "loglevel"){
                // Step 3: Retrieve the value for each key
                    const storedData = localStorage.getItem(key);
                    console.log("THIS IS STORED DATA", storedData); 
                    // ^this is current just equal to INFO for some reason

                    // Step 4: Do something with the key-value pair
                    const parsedData = JSON.parse(storedData);
                    console.log(parsedData);
                    console.log("type: ", parsedData[0].type);
                    console.log("schedule: ", parsedData[0].schedule)
                    if(parsedData[0].type === 'month'){
                        // loop through parsedData.schedule - add the activites to activites array
                        
                        for(let i = 0; i < 4; i++){ 
                            console.log("week", parsedData[0].schedule[i].week, selected)
                            if(parsedData[0].schedule[i].week[4]===selected[5]){
                                console.log("matched!", selected)
                                const result = parsedData[0].schedule[i].activity; // activity gets a list
                                onWeekChange(selected, result);
                            }
                        }
                    }
                }
                
            });
        }
    }

    const monthOrNot = (data) => {
        const months = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];

        const isWordInList = months.includes(data)

        if(isWordInList){
            return true;
        }

        return false;
    }
    
    if(item.childrens){
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span>
                        {/* { item.icon && <i className={item.icon}></i> } */}
                        {item.title}    
                    </span> 
                    <i className="bi-chevron-down toggle-btn" onClick={() => {setOpen(!open); handleClick(item.title, monthOrNot(item.title))}}></i>
                </div>
                <div className="sidebar-content">
                    { item.childrens.map((child, index) => <SidebarItem key={index} item={child} onMonthChange={onMonthChange} onWeekChange={onWeekChange}/>) }
                </div>
            </div>
        )
    }else{
        return (
            <a href={item.path || "#"} className="sidebar-item plain" onClick={()=>handleClick(item.title, monthOrNot(item.title))}>
                {/* { item.icon && <i className={item.icon}></i> } */}
                {item.title}
            </a>
        )
    }
}