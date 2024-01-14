import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars({monthOrWeek}) {
    return (
    <div>
        <h3>{monthOrWeek==="Week"? "Weekly Stats" : "Monthly Stats"}</h3>
        <BarChart
        // if the monthorweek is week, data should just have week 1,2,3,4
        // if its month, then data should be the months involved in the schedule
        // will this use "usestate"?
        xAxis={[{ scaleType: 'band', data: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri','Sat','Sun'] }]}
        series={[{ data: [4, 3, 5,1,2,3,4] }]} // also will come from other data
        width={500}
        height={300}

        />
    </div>
    );
}


