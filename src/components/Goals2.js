// import {useState} from 'react';
// import { FixedSizeList as List } from 'react-window';
// import { Checkbox, FormControlLabel } from '@mui/material';

// const VirtualizedChecklist = ({ items, monthOrWeek } ) => {
//   const [checkedItems, setCheckedItems] = useState({});

//   const handleCheckboxChange = (item) => {
//     setCheckedItems((prevCheckedItems) => ({
//       ...prevCheckedItems,
//       [item]: !prevCheckedItems[item],
//     }));
//   };

//   const Row = ({ index, style }) => {
//     const item = items[index];
//     const isChecked = checkedItems[item] || false;
    
//     return (
//       <div style={style}>

//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={isChecked}
//               onChange={() => handleCheckboxChange(item)}
//             />
//           }
          
//           label={
//             <span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
//               {item}
//             </span>
//           }
//         />
//       </div>
//     );
//   };
  
//   return (
//     <>
//         <h3>{monthOrWeek==="Week"? "Weekly Tasks" : "Monthly Tasks"}</h3>

//         <List
//         height={400}
//         itemCount={items.length}
//         itemSize={60}
//         width={400}
//         >
//         {Row}
//         </List>
//     </>
//   );
// };

// export default VirtualizedChecklist;

import {useState, useEffect} from 'react';
import { FixedSizeList as List } from 'react-window';
import { Checkbox, FormControlLabel } from '@mui/material';

const VirtualizedChecklist = ({ self, items }) => {

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

  const [checkedItems, setCheckedItems] = useState(Object.keys(localStorage).includes('checked_items')?JSON.parse(localStorage.getItem('checked_items')):newCheckedItems);
  const [checkedCount, setCheckedCount] = useState(self.childrens?checkedItems[monthToIndex[self.title]].checked:checkedItems[monthToIndex[self.parent]].childrens[weekToIndex[self.title]].checked);

  useEffect(() => {localStorage.setItem('checked_items', JSON.stringify(checkedItems));}, [checkedItems]);

  useEffect(() => {console.log(checkedCount);}, [checkedCount]);

  const handleCheckboxChange = (self, item) => {
    setCheckedCount(self.childrens?checkedItems[monthToIndex[self.title]].checked:checkedItems[monthToIndex[self.parent]].childrens[weekToIndex[self.title]].checked);
    if(self.childrens) {
      const checkedList = checkedItems[monthToIndex[self.title]].checked_list;
      if(!Object.keys(checkedList).includes(item)) {
        checkedList[item] = true;
      }
      else {
        checkedList[item] = !checkedList[item];
      }
      if(checkedList[item]) {
        const first = checkedItems.slice(0, monthToIndex[self.title]);
        first.push({
            "title": self.title, 
            "checked": checkedItems[monthToIndex[self.title]].checked + 1,
            "checked_list": checkedList,
            "childrens": checkedItems[monthToIndex[self.title]].childrens
          });
        const second = first.concat(checkedItems.slice(monthToIndex[self.title]+1, 12));
        setCheckedItems(second);
      }
      else {
        const first = checkedItems.slice(0, monthToIndex[self.title]);
        first.push({
            "title": self.title, 
            "checked": checkedItems[monthToIndex[self.title]].checked - 1,
            "checked_list": checkedList,
            "childrens": checkedItems[monthToIndex[self.title]].childrens
          });
        const second = first.concat(checkedItems.slice(monthToIndex[self.title]+1, 12));
        setCheckedItems(second);
      }
    }
    else {
      const checkedList = checkedItems[monthToIndex[self.parent]].childrens[weekToIndex[self.title]].checked_list;
      if(!Object.keys(checkedList).includes(item)) {
        checkedList[item] = true;
      }
      else {
        checkedList[item] = !checkedList[item];
      }
      if(checkedList[item]) {
        const first = checkedItems.slice(0, monthToIndex[self.parent]);
        const first_children = checkedItems[monthToIndex[self.parent]].childrens.slice(0,weekToIndex[self.title]);
        first_children.push({"title": self.title, "parent": self.parent, "checked": checkedItems[monthToIndex[self.parent]].childrens[weekToIndex[self.title]].checked + 1 , "checked_list": checkedList});
        const second_children = first_children.concat(checkedItems[monthToIndex[self.parent]].childrens.slice(weekToIndex[self.title]+1, 4));
        first.push({
          "title": self.parent, 
          "checked": checkedItems[monthToIndex[self.parent]].checked + 1,
          "checked_list": checkedItems[monthToIndex[self.parent]].checked_list,
          "childrens": second_children
        });
        const second = first.concat(checkedItems.slice(monthToIndex[self.parent]+1, 12));
        setCheckedItems(second);
      }
      else {
        const first = checkedItems.slice(0, monthToIndex[self.parent]);
        const first_children = checkedItems[monthToIndex[self.parent]].childrens.slice(0,weekToIndex[self.title]);
        first_children.push({"title": self.title, "parent": self.parent, "checked": checkedItems[monthToIndex[self.parent]].childrens[weekToIndex[self.title]].checked - 1 , "checked_list": checkedList});
        const second_children = first_children.concat(checkedItems[monthToIndex[self.parent]].childrens.slice(weekToIndex[self.title]+1, 4));
        first.push({
          "title": self.parent, 
          "checked": checkedItems[monthToIndex[self.parent]].checked - 1,
          "checked_list": checkedItems[monthToIndex[self.parent]].checked_list,
          "childrens": second_children
        });
        const second = first.concat(checkedItems.slice(monthToIndex[self.parent]+1, 12));
        setCheckedItems(second);
      }
    }
    setCheckedCount(self.childrens?checkedItems[monthToIndex[self.title]].checked:checkedItems[monthToIndex[self.parent]].childrens[weekToIndex[self.title]].checked);
  };

  if (self.childrens) {
    items = [items];
  }

  const Row = ({ index, style }) => {
    const item = items[index];
    const checkedList = self.childrens?checkedItems[monthToIndex[self.title]].checked_list:checkedItems[monthToIndex[self.parent]].childrens[weekToIndex[self.title]].checked_list;
    const isChecked = checkedList[item] || false;

    return (
      <div style={style}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onClick={() => handleCheckboxChange(self, item)}
            />
          }
          label={
            <span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
              {item}
            </span>
          }
        />
      </div>
    );
  };

  return (
    <>
      <h3>{self.childrens ? "Monthly Tasks" : "Weekly Task"}</h3>

      <p>Total checked items: {checkedCount}</p>

      <List height={400} itemCount={items.length} itemSize={60} width={400}>
        {Row}
      </List>
    </>
  );
};

export default VirtualizedChecklist;
