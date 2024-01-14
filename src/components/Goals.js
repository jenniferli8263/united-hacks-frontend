import React, { useState } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

function renderRow(props) {
  const { index, style } = props;
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

function Goals() {
  const [checked, setChecked] = useState([]);
  const checkList = ["Apple", "Banana", "Your mom", "GG", "This is amazing", "Heehee", "LMFAO", "Eahreuh"];

  const handleCheck = (event) => {
    const updatedList = [...checked];
    if (event.target.checked) {
      updatedList.push(event.target.value);
    } else {
      const index = updatedList.indexOf(event.target.value);
      if (index !== -1) {
        updatedList.splice(index, 1);
      }
    }
    setChecked(updatedList);
  };

  const checkedItems = checked.length
    ? checked.join(', ')
    : "";

  const isChecked = (item) => (checked.includes(item) ? "checked-item" : "not-checked-item");

  return (
    <div className="app">
      <div className="checkList">
        <div className="title">Your CheckList:</div>

        <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
          <FixedSizeList
            height={400}
            width={360}
            itemSize={46}
            itemCount={200}
            overscanCount={5}
          >
            {renderRow}
          </FixedSizeList>
        </Box>

        <div className="list-container">
          {checkList.map((item, index) => (
            <div key={index} className={`animated-item ${isChecked(item)}`}>
              <input value={item} type="checkbox" onChange={handleCheck} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        {`Items checked are: ${checkedItems}`}
      </div>
    </div>
  );
}

export default Goals;
