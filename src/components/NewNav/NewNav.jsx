import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Grid, Container } from '@mui/material';


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
  const [heading, setHeading] = useState('NewNav');

  return (
    <Container>
      <Grid container>
    <div>
      <h2>{heading}</h2>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
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
          <MenuItem onClick={handleClose}><Link className="navLink" to="/login">
            Login / Register
          </Link></MenuItem>
        }

{user.id && (
  <>
        <MenuItem onClick={handleClose}><Link className="navLink" to="/profile">My Profile</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link className="navLink" to="/newmatches">See New Matches</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link className="navLink" to="/selectedmatches">Current Matches</Link></MenuItem>
        <MenuItem onClick={handleClose}><LogOutButton className="navLink" /></MenuItem>
        </>
)}

        <MenuItem onClick={handleClose}><Link className="navLink" to="/about">
          About
        </Link></MenuItem>
      </Menu>
    </div>
    </Grid>
    </Container>
  );
}

export default NewNav;
