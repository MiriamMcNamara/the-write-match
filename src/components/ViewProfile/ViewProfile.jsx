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
  const [heading, setHeading] = useState("Your Write Match Profile");
  const [ emoji, setEmoji ] = useState( '👋');

  return (
    <Container>
      <Grid container >
      {/* <Grid item xs={12} sx={{ backgroundColor: 'lightBlue', marginBottom: "10px"}}>
      <Typography
              variant="h3"
              component="h2"
              gutterBottom
              textAlign="center"
              paddingTop="15px"
            >
              {heading}
            </Typography>
            </Grid> */}
            <Grid item paddingBottom="20px">
        <Paper sx={{ margin: '5px', marginColor: "secondary"}}>
          
      
          {writer.map((writer) => (
            <Grid item className="profile" key={writer.id} padding="10px">
              <Typography variant="h5" textAlign="center">
                Hi {emoji} {writer.name}!
              </Typography>
              <br />
              <Typography variant="h6" textAlign="center" fontStyle="italic" >Welcome to {heading}</Typography>
              <br />
              <Grid item >
                <Box sx={{ border: 5, borderColor: "secondary.main" }}>
              <img src={writer.image}/>
              </Box>
              </Grid>
              
              <br />
              <Typography textAlign="center">{writer.bio}</Typography>
              <br />
              <Typography textAlign="center" variant="subtitle1" fontStyle="italic">Work In Progress:</Typography>
              <Typography textAlign="center">{writer.wip}</Typography>
              <br />
              <Typography textAlign="center" variant="subtitle1" fontStyle="italic">Genre:</Typography>
              <Typography textAlign="center" >{writer.genres}</Typography>
            </Grid>
            
          ))}
    
          {availableFor.map((availableFor) => (
            <Grid item className="availableFor" key={writer.id} padding="10px">
              <Typography textAlign="center" fontStyle="italic" variant="subtitle1">What I'm Most Excited to Offer Others:</Typography>
              <Typography textAlign="center">{availableFor.skill}</Typography>
            </Grid>
          ))}
  
          {seeking.map((seeking) => (
            <Grid item className="seeking" key={writer.id} padding="10px">
              <Typography textAlign="center" fontStyle="italic" variant="subtitle1">What I'm Primarily Looking For:</Typography>
              <Typography textAlign="center">{seeking.skill}</Typography>
            </Grid>
          ))}
          <br />
        </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ViewProfile;
