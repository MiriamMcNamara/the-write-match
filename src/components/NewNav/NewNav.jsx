import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogOutButton from '../LogOutButton/LogOutButton';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { cyan } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  navItem: {
    backgroundColor: cyan
  }
});

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


  const classes = useStyles();

  return (
    <Container>
      <Grid container padding="10px" 
      sx={{ border: 5, borderColor: "secondary.main", backgroundColor: "lightBlue" }}
      marginBottom="20px">
        <Grid item xs={9}>
      <Typography sx={{ fontStyle: 'italic' }} variant="h3" color="primary">{heading}</Typography>
      </Grid>
      <Grid item xs={3}>
      <Button
        id="basic-button"
        variant="large"
        variant="contained"
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
          <MenuItem onClick={handleClose}><Link to="/login"><Typography variant="overline" color="primary">
            Login / Register
            </Typography></Link></MenuItem>
        }

{user.id && (
  <>
        <MenuItem className={classes.navItem} onClick={handleClose}><Link  to="/profile"><Typography variant="overline" color="primary">My Profile</Typography></Link></MenuItem>
        <MenuItem onClick={handleClose}><Link  to="/newmatches"><Typography variant="overline" color="primary">See New Matches</Typography></Link></MenuItem>
        <MenuItem onClick={handleClose}><Link  to="/selectedmatches"><Typography variant="overline" color="primary">Current Matches</Typography></Link></MenuItem>
        <MenuItem onClick={handleClose}><LogOutButton /></MenuItem>
        </>
)}

        <MenuItem onClick={handleClose}><Link to="/about"><Typography variant="overline" color="primary">
          About The Write Match
          </Typography></Link></MenuItem>
          <MenuItem onClick={handleClose}><Link to="/login"><Typography variant="overline" color="primary">
            Login / Register
            </Typography></Link></MenuItem>
      </Menu>
    </Grid>
    </Container>
  );
}

export default NewNav;
