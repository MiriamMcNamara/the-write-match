import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogOutButton from "../LogOutButton/LogOutButton";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function NewNav(props) {
  const [anchorEl, setAnchorEl] = React.useState(null); //anchor for the menu element
  const open = Boolean(anchorEl); //boolean to set the menu anchor element
  const handleClick = (event) => {
    //clicking on the anchor will set the anchor boolean
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    //if the boolean is set to null, it'll close the menu
    setAnchorEl(null);
  };

  const user = useSelector((store) => store.user);
  const [heading, setHeading] = useState("The Write Match");

  return (
    <Container>
      <Grid
        container
        padding="10px"
        sx={{
          border: 5,
          borderColor: "secondary.main",
          backgroundColor: "lightBlue",
        }}
        marginBottom="20px"
      >
        <Grid item xs={9}>
          <Typography variant="h4">{heading}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            id="basic-button"
            variant="large"
            variant="contained"
            color="secondary"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
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
            "aria-labelledby": "basic-button",
          }}
        >
          {!user.id && (
            <>
              {/* If there's no user, show login/registration link and about page */}
              <MenuItem onClick={handleClose}>
                <Link to="/login">
                  <Typography variant="button">Login / Register</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/about">
                  <Typography variant="button">
                    About The Write Match
                  </Typography>
                </Link>
              </MenuItem>
            </>
          )}

          {user.id && (
            <>
              {/* if there IS a user.id, show all the protected routes and the about page */}
              <MenuItem onClick={handleClose}>
                <Link to="/profile">
                  <Typography variant="button">Profile</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/newmatches">
                  <Typography variant="button">New Matches</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/selectedmatches">
                  <Typography variant="button">Current Matches</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/about">
                  <Typography variant="button">
                    About The Write Match
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <LogOutButton />
              </MenuItem>
            </>
          )}
        </Menu>
      </Grid>
    </Container>
  );
}

export default NewNav;
