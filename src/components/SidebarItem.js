import { useState } from "react";

export default function SidebarItem({item, onMonthChange, onWeekChange}){
    const [open, setOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("");

    const monthToIndex = {
        'January': 0,
        'February': 1,
        'March': 2,
        'April': 3,
        'May': 4,
        'June': 5,
        'July': 6, 
        'August': 7,
        'September': 8,
        'October': 9,
        'November': 10,
        'December': 11
    };

    const monthToAbbr = {
        'January': 'Jan',
        'February': 'Feb',
        'March': 'Mar',
        'April': 'Apr',
        'May': 'May',
        'June': 'Jun',
        'July': 'Jul', 
        'August': 'Aug',
        'September': 'Sep',
        'October': 'Oct',
        'November': 'Nov',
        'December': 'Dec'
    };

    const weekToIndex = {
        'Week 1': 0, 
        'Week 2': 1,
        'Week 3': 2,
        'Week 4': 3
    };

    const handleClick = (clicked_item) => {
        const keys = Object.keys(localStorage);
        if(clicked_item.childrens) {
            console.log('Month clicked:', item.title);
            if(keys.includes('general_schedule')) {
                const schedule = JSON.parse(localStorage.getItem('general_schedule'));
                const monthData = schedule.schedule[monthToIndex[item.title]];
                console.log(monthData);
                onMonthChange(clicked_item, monthData.goal);
            }
        }
        else {
            console.log('Week clicked:', item.parent, item.title);
            if(keys.includes('detailed_schedule_'+monthToAbbr[item.parent])) {
                const schedule = JSON.parse(localStorage.getItem('detailed_schedule_'+monthToAbbr[item.parent]));
                console.log(schedule);
                const weekData = schedule.schedule[weekToIndex[item.title]];
                console.log(weekData);
                onWeekChange(clicked_item, weekData.goal);
            }
        }
    }
    
    if(item.childrens){
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span>
                        {/* { item.icon && <i className={item.icon}></i> } */}
                        {item.title}    
                    </span> 
                    <i className="bi-chevron-down toggle-btn" onClick={() => {setOpen(!open); setSelectedMonth(item.title); handleClick(item)}}></i>
                </div>
                <div className="sidebar-content">
                    { item.childrens.map((child, index) => <SidebarItem key={index} item={child} onMonthChange={onMonthChange} onWeekChange={onWeekChange}/>) }
                </div>
            </div>
        )
    }else{
        return (
            <a href={item.path || "#"} className="sidebar-item plain" onClick={()=>handleClick(item)}>
                {/* { item.icon && <i className={item.icon}></i> } */}
                {item.title}
            </a>
        )
    }
}