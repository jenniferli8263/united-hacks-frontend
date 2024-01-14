import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { Checkbox, FormControlLabel } from '@mui/material';

const VirtualizedChecklist = ({ items, monthOrWeek } ) => {
  const [checkedItems, setCheckedItems] = React.useState({});

  const handleCheckboxChange = (item) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [item]: !prevCheckedItems[item],
    }));
  };

  const Row = ({ index, style }) => {
    const item = items[index];
    const isChecked = checkedItems[item] || false;
    
    return (
      <div style={style}>

        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={() => handleCheckboxChange(item)}
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
        <h3>{monthOrWeek==="Week"? "Weekly Tasks" : "Monthly Tasks"}</h3>

        <List
        height={400}
        itemCount={items.length}
        itemSize={60}
        width={400}
        >
        {Row}
        </List>
    </>
  );
};

export default VirtualizedChecklist;
