import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//this component creates an item for each match that the NewMatchesList
//pulls from the matches reducer and displays it on the DOM

function NewMatchesItem(props) {
  const writer = useSelector((store) => store.writer);
  const user = useSelector((store) => store.user);
  const availablefor = useSelector((store) => store.availablefor);
  const seeking = useSelector((store) => store.seeking);
  const dispatch = useDispatch();

  useEffect(() => {
    //get all the user info to load onto the page, GET routes in writer.router
    checkAvailableFor();
    checkSeeking();
  }, []);

  //when the user clicks on the 'Match With this Writer!' button,
  //this function checks to see whether there is already a match that exists
  //with this writer in the database (initiated by the other writer--otherwise
  //the writer wouldn't show up on this page). In the matches.saga, this will determine
  //whether the router sends a PUT or a POST on button click
  const checkForMatch = () => {
    console.log(
      "in checkForMatch, initiator:",
      props.match.id,
      "approver:",
      writer[0].id
    );
    dispatch({
      type: "CHECK_MATCHES",
      payload: {
        initiator: props.match.id,
        approver: writer[0].id,
        writer: writer[0].id,
        seeking: seeking[0].seeking_id,
        availablefor: availablefor[0].available_for_id,
        user: user.id,
      },
    });
    window.scrollTo(0, 0); //added this for ease of presentation, not necessary here
  };
  //availableFor hooks
  const [lookingFor, setLookingFor] = useState("");
  const [availableFor, setAvailableFor] = useState("");

  const checkSeeking = () => {
    if (props.match.seeking_id === 1) {
      setLookingFor("Developmental Editing Help");
    }
    if (props.match.seeking_id === 2) {
      setLookingFor("Copy/Line Editing Help");
    }
    if (props.match.seeking_id === 3) {
      setLookingFor("An Accountability Buddy");
    }
    if (props.match.seeking_id === 4) {
      setLookingFor("A Critique Group");
    }
    if (props.match.seeking_id === 5) {
      setLookingFor("Someone to Manuscript Swap With");
    }
    if (props.match.seeking_id === 6) {
      setLookingFor("World-Building Help");
    }
    if (props.match.seeking_id === 7) {
      setLookingFor("Publishing Strategy Help");
    }
    if (props.match.seeking_id === 8) {
      setLookingFor("Socializing and Community");
    }
  };

  const checkAvailableFor = () => {
    if (props.match.available_for_id === 1) {
      setAvailableFor("My Developmental Editing Expertise");
    }
    if (props.match.available_for_id === 2) {
      setAvailableFor("My Copy/Line Editing Skills");
    }
    if (props.match.available_for_id === 3) {
      setAvailableFor("An Accountability Buddy");
    }
    if (props.match.available_for_id === 4) {
      setAvailableFor("Being a Member of a Critique Group");
    }
    if (props.match.available_for_id === 5) {
      setAvailableFor("Trading Manscripts");
    }
    if (props.match.available_for_id === 6) {
      setAvailableFor("My World-Building Expertise");
    }
    if (props.match.available_for_id === 7) {
      setAvailableFor("Publishing Strategizing");
    }
    if (props.match.available_for_id === 8) {
      setAvailableFor("Socializing and Community");
    }
  };

  return (
    <Grid item key={props.match.id}>
      <Card
        elevation={2}
        sx={{ marginTop: "20px", border: 5, borderColor: "secondary.main" }}
      >
        <CardContent sx={{ backgroundColor: "lightBlue" }}>
          <Typography textAlign="center" variant="h4">
            {props.match.name}
          </Typography>
        </CardContent>
        <CardMedia
          sx={{ borderTop: 5, borderBottom: 5, borderColor: "secondary.main" }}
          component="img"
          image={props.match.image}
          alt="matched writer"
        />
        <CardContent>
          <Typography variant="body1" textAlign="center">
            {props.match.bio}
          </Typography>
          <br />
          <Typography variant="body2" textAlign="center" fontStyle="italic">
            Work in Progress:
          </Typography>
          <Typography variant="body2" textAlign="center">
            {props.match.wip}
          </Typography>
          <br />
          <Typography variant="body2" textAlign="center" fontStyle="italic">
            Genres:
          </Typography>
          <Typography variant="body2" textAlign="center">
            {props.match.genres}
          </Typography>
          <br />
          <Typography variant="body2" textAlign="center" fontStyle="italic">
            What I'm Seeking:
          </Typography>
          <Typography variant="body2" textAlign="center">
            {lookingFor}
          </Typography>
          <br />
          <Typography variant="body2" textAlign="center" fontStyle="italic">
            What I'm Available For:
          </Typography>
          <Typography variant="body2" textAlign="center">
            {availableFor}
          </Typography>
        </CardContent>
        <CardContent>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <Button
                variant="contained"
                color="secondary"
                onClick={checkForMatch}
              >
                Match With This Writer!
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default NewMatchesItem;
