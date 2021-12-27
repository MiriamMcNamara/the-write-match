import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, Container, Paper, Button } from "@mui/material";

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
      <Grid container padding="10px">
        <Paper padding="10px">
          <Grid item xs={12} padding="10px">
            <Typography
              variant="h4"
              color="primary"
              component="h2"
              gutterBottom
            >
              {heading}
            </Typography>
          </Grid>
          {writer.map((writer) => (
            <Grid item className="profile" key={writer.id} padding="10px">
              <Typography variant="h4" fontStyle="italic" color="secondary">
                {writer.name}
              </Typography>
              <br />
              <img src={writer.image} />
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
              <Typography variant="h6">Available For:</Typography>
              <Typography>{availableFor.skill}</Typography>
            </Grid>
          ))}
  
          {seeking.map((seeking) => (
            <Grid item className="seeking" key={writer.id} padding="10px">
              <Typography variant="h6">Seeking:</Typography>
              <Typography>{seeking.skill}</Typography>
            </Grid>
          ))}
        </Paper>
      </Grid>
    </Container>
  );
}

export default ViewProfile;
