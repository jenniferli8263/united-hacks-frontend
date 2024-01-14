import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import {useState} from 'react';

const BasicBars = ({self}) => {

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
    
      const weekToIndex = {
        'Week 1': 0, 
        'Week 2': 1,
        'Week 3': 2,
        'Week 4': 3
      };

    const newCheckedItems = [
        {
          "title": "January",
          "checked": 0, 
          "checked_list": {}, 
          "childrens": [
            {"title": "Week 1", "parent": "January", "checked": 0, "checked_list": {}},
            {"title": "Week 2", "parent": "January", "checked": 0, "checked_list": {}},
            {"title": "Week 3", "parent": "January", "checked": 0, "checked_list": {}},
            {"title": "Week 4", "parent": "January", "checked": 0, "checked_list": {}}
          ]
        },
        {
          "title": "February",
          "checked": 0, 
          "checked_list": {}, 
          "childrens": [
            {"title": "Week 1", "parent": "February", "checked": 0, "checked_list": {}},
            {"title": "Week 2", "parent": "February", "checked": 0, "checked_list": {}},
            {"title": "Week 3", "parent": "February", "checked": 0, "checked_list": {}},
            {"title": "Week 4", "parent": "February", "checked": 0, "checked_list": {}}
          ]
        },
        {
          "title": "March",
          "checked": 0, 
          "checked_list": {}, 
          "childrens": [
            {"title": "Week 1", "parent": "March", "checked": 0, "checked_list": {}},
            {"title": "Week 2", "parent": "March", "checked": 0, "checked_list": {}},
            {"title": "Week 3", "parent": "March", "checked": 0, "checked_list": {}},
            {"title": "Week 4", "parent": "March", "checked": 0, "checked_list": {}}
          ]
        },
        {
          "title": "April",
          "checked": 0, 
          "checked_list": {}, 
          "childrens": [
            {"title": "Week 1", "parent": "April", "checked": 0, "checked_list": {}},
            {"title": "Week 2", "parent": "April", "checked": 0, "checked_list": {}},
            {"title": "Week 3", "parent": "April", "checked": 0, "checked_list": {}},
            {"title": "Week 4", "parent": "April", "checked": 0, "checked_list": {}}
          ]
        },
        {
          "title": "May",
          "checked": 0, 
          "checked_list": {}, 
          "childrens": [
            {"title": "Week 1", "parent": "May", "checked": 0, "checked_list": {}},
            {"title": "Week 2", "parent": "May", "checked": 0, "checked_list": {}},
            {"title": "Week 3", "parent": "May", "checked": 0, "checked_list": {}},
            {"title": "Week 4", "parent": "May", "checked": 0, "checked_list": {}}
          ]
        },
        {
          "title": "June",
          "checked": 0, 
          "checked_list": {}, 
          "childrens": [
            {"title": "Week 1", "parent": "June", "checked": 0, "checked_list": {}},
            {"title": "Week 2", "parent": "June", "checked": 0, "checked_list": {}},
            {"title": "Week 3", "parent": "June", "checked": 0, "checked_list": {}},
            {"title": "Week 4", "parent": "June", "checked": 0, "checked_list": {}}
          ]
        },
        {
          "title": "July",
          "checked": 0, 
          "checked_list": {}, 
          "childrens": [
            {"title": "Week 1", "parent": "July", "checked": 0, "checked_list": {}},
            {"title": "Week 2", "parent": "July", "checked": 0, "checked_list": {}},
            {"title": "Week 3", "parent": "July", "checked": 0, "checked_list": {}},
            {"title": "Week 4", "parent": "July", "checked": 0, "checked_list": {}}
          ]
        },
        {
          "title": "August",
          "checked": 0, 
          "checked_list": {}, 
          "childrens": [
            {"title": "Week 1", "parent": "August", "checked": 0, "checked_list": {}},
            {"title": "Week 2", "parent": "August", "checked": 0, "checked_list": {}},
            {"title": "Week 3", "parent": "August", "checked": 0, "checked_list": {}},
            {"title": "Week 4", "parent": "August", "checked": 0, "checked_list": {}}
          ]
        },
        {
          "title": "September",
          "checked": 0, 
          "checked_list": {}, 
          "childrens": [
            {"title": "Week 1", "parent": "September", "checked": 0, "checked_list": {}},
            {"title": "Week 2", "parent": "September", "checked": 0, "checked_list": {}},
            {"title": "Week 3", "parent": "September", "checked": 0, "checked_list": {}},
            {"title": "Week 4", "parent": "September", "checked": 0, "checked_list": {}}
          ]
        },
        {
          "title": "October",
          "checked": 0, 
          "checked_list": {}, 
          "childrens": [
            {"title": "Week 1", "parent": "October", "checked": 0, "checked_list": {}},
            {"title": "Week 2", "parent": "October", "checked": 0, "checked_list": {}},
            {"title": "Week 3", "parent": "October", "checked": 0, "checked_list": {}},
            {"title": "Week 4", "parent": "October", "checked": 0, "checked_list": {}}
          ]
        },
        {
          "title": "November",
          "checked": 0, 
          "checked_list": {}, 
          "childrens": [
            {"title": "Week 1", "parent": "November", "checked": 0, "checked_list": {}},
            {"title": "Week 2", "parent": "November", "checked": 0, "checked_list": {}},
            {"title": "Week 3", "parent": "November", "checked": 0, "checked_list": {}},
            {"title": "Week 4", "parent": "November", "checked": 0, "checked_list": {}}
          ]
        },
        {
          "title": "December",
          "checked": 0, 
          "checked_list": {}, 
          "childrens": [
            {"title": "Week 1", "parent": "December", "checked": 0, "checked_list": {}},
            {"title": "Week 2", "parent": "December", "checked": 0, "checked_list": {}},
            {"title": "Week 3", "parent": "December", "checked": 0, "checked_list": {}},
            {"title": "Week 4", "parent": "December", "checked": 0, "checked_list": {}}
          ]
        }
      ];

    // X-Axis Data (Either Months or Weeks)
    let xAxisData = [];
    if (!self.childrens) {xAxisData = ["Week 1","Week 2","Week 3","Week 4"];}
    else {xAxisData = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];}

    // Series Data (Goals Completed)
    const [checkedItems, setCheckedItems] = useState(Object.keys(localStorage).includes('checked_items')?JSON.parse(localStorage.getItem('checked_items')):newCheckedItems);
    let seriesData = [];
    if (!self.childrens) {
        checkedItems[monthToIndex[self.parent]].childrens.forEach((element) => seriesData.push(element.checked));
    }
    else {
        checkedItems.forEach((element) => seriesData.push(element.checked));
    }

    return (
    <div>  
        <h3>{!self.childrens? "Weekly Stats" : "Monthly Stats"}</h3>
        
        <BarChart
        xAxis={[{ scaleType: 'band', data: xAxisData }]}
        series={[{ data: seriesData }]}
        width={500}
        height={300}
        />

    </div>
    );
}

export default BasicBars;