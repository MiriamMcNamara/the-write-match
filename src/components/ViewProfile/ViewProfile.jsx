import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';

function ViewProfile(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_WRITER", payload: user.id });
    dispatch({ type: "FETCH_SEEKING", payload: user.id });
    dispatch({ type: "FETCH_AVAILABLE_FOR", payload: user.id });
  }, []);

  const writer = useSelector((store) => store.writer);
  const seeking = useSelector((store) => store.seeking);
  const availableFor = useSelector((store) => store.availablefor);
  const user = useSelector((store) => store.user);
  const [heading, setHeading] = useState("My Profile");

  return (
    <Container>
      <Grid container >
      <Grid item xs={12}>
      <Typography
              variant="h4"
              color="primary"
              component="h2"
              gutterBottom
              textAlign="center"
            >
              {heading}
            </Typography>
            </Grid>
        <Paper padding="10px">
          
      
          {writer.map((writer) => (
            <Grid item className="profile" key={writer.id} padding="10px">
              <Typography variant="h4" fontStyle="italic" color="secondary">
                {writer.name}
              </Typography>
              <br />
              <Grid item >
                <Box sx={{ border: 5, borderColor: "secondary.main" }}>
              <img src={writer.image}/>
              </Box>
              </Grid>
              <br />
              <br />
              <Typography>{writer.bio}</Typography>
              <br />
              <Typography variant="h6">Work In Progress:</Typography>
              <Typography>{writer.wip}</Typography>
              <br />
              <Typography variant="h6">Genre:</Typography>
              <Typography>{writer.genres}</Typography>
            </Grid>
          ))}
    
          {availableFor.map((availableFor) => (
            <Grid item className="availableFor" key={writer.id} padding="10px">
              <Typography variant="h6">What I'm Available For:</Typography>
              <Typography>{availableFor.skill}</Typography>
            </Grid>
          ))}
  
          {seeking.map((seeking) => (
            <Grid item className="seeking" key={writer.id} padding="10px">
              <Typography variant="h6">What I'm Seeking:</Typography>
              <Typography>{seeking.skill}</Typography>
            </Grid>
          ))}
        </Paper>
      </Grid>
    </Container>
  );
}

export default ViewProfile;
