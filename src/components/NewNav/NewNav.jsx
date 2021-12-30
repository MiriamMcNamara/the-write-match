import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Grid, Container } from '@mui/material';
import Typography from '@mui/material/Typography';


function NewNav(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const user = useSelector((store) => store.user);
  const [heading, setHeading] = useState('The Write Match');

  return (
    <Container>
      <Grid container paddingTop="50px" paddingBottom="70px">
        <Grid item xs={9}>
      <Typography variant="h3">{heading}</Typography>
      </Grid>
      <Grid item xs={3}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Menu
      </Button>
      </Grid>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
{user.id === null &&
          // If there's no user, show login/registration links
          <MenuItem onClick={handleClose}><Link to="/login">
            Login / Register
          </Link></MenuItem>
        }

{user.id && (
  <>
        <MenuItem onClick={handleClose}><Link  to="/profile">My Profile</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link  to="/newmatches">See New Matches</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link  to="/selectedmatches">Current Matches</Link></MenuItem>
        <MenuItem onClick={handleClose}><LogOutButton /></MenuItem>
        </>
)}

        <MenuItem onClick={handleClose}><Link to="/about">
          About
        </Link></MenuItem>
      </Menu>
    </Grid>
    </Container>
  );
}

export default NewNav;
