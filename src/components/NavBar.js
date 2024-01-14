import * as React from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import avatarImg from '../imgs/avatar.png';
import { useNavigate} from 'react-router-dom';


export default function ButtonAppBar() {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setUser(event.currentTarget);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar>
            <IconButton onClick={() => navigate("/")}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:"white"}}>
                Smart Planner
                </Typography>
            </IconButton>
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton onClick={() => navigate("/Dashboard")} sx={{ p: 0 }}>
              <Avatar src='./imgs/avatar.jpg' />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
