import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ContactMatchButton from "../ContactMatchButton/ContactMatchButton";

//this component creates an item for each match that the SelectedMatchesList
//pulls from the selected reducer and displays it on the DOM.
//It has conditional rendering depending on whether the match is confirmed
//or awaiting confirmation.

function SelectedMatchesItem(props) {
  const writer = useSelector((store) => store.writer);
  const user = useSelector((store) => store.user);
  const seeking = useSelector((store) => store.seeking);
  const availablefor = useSelector((store) => store.availablefor);
  const dispatch = useDispatch();

  useEffect(() => {
    //get all the user info to load onto the page, GET routes in writer.router
    checkAvailableFor();
    checkSeeking();
  }, []);

  const [lookingFor, setLookingFor] = useState("");
  const [availableFor, setAvailableFor] = useState("");

  const checkSeeking = () => {
    if (props.selected.seeking_id === 1) {
      setLookingFor("Developmental Editing Help");
    }
    if (props.selected.seeking_id === 2) {
      setLookingFor("Copy/Line Editing Help");
    }
    if (props.selected.seeking_id === 3) {
      setLookingFor("An Accountability Buddy");
    }
    if (props.selected.seeking_id === 4) {
      setLookingFor("A Critique Group");
    }
    if (props.selected.seeking_id === 5) {
      setLookingFor("Someone to Manuscript Swap With");
    }
    if (props.selected.seeking_id === 6) {
      setLookingFor("World-Building Help");
    }
    if (props.selected.seeking_id === 7) {
      setLookingFor("Publishing Strategy Help");
    }
    if (props.selected.seeking_id === 8) {
      setLookingFor("Socializing and Community");
    }
  };

  const checkAvailableFor = () => {
    if (props.selected.available_for_id === 1) {
      setAvailableFor("My Developmental Editing Expertise");
    }
    if (props.selected.available_for_id === 2) {
      setAvailableFor("My Copy/Line Editing Skills");
    }
    if (props.selected.available_for_id === 3) {
      setAvailableFor("An Accountability Buddy");
    }
    if (props.selected.available_for_id === 4) {
      setAvailableFor("Being a Member of a Critique Group");
    }
    if (props.selected.available_for_id === 5) {
      setAvailableFor("Trading Manscripts");
    }
    if (props.selected.available_for_id === 6) {
      setAvailableFor("My World-Building Expertise");
    }
    if (props.selected.available_for_id === 7) {
      setAvailableFor("Publishing Strategizing");
    }
    if (props.selected.available_for_id === 8) {
      setAvailableFor("Socializing and Community");
    }
  };

  //the user can delete a selected match that is confirmed or awaiting
  //confirmation. We need to send all of this info in the payload because this
  //dispatch triggers the 'FILTER_MATCHES' saga to run again.
  const deleteSelected = () => {
    dispatch({
      type: "DELETE_SELECTED",
      payload: {
        match: props.selected.matches_id,
        writer: writer[0].id,
        seeking: seeking[0].seeking_id,
        availablefor: availablefor[0].available_for_id,
        user: user.id,
      },
    });
    window.scrollTo(0, 0);
  };

  return props.selected.confirmed ? (
    <Grid item key={props.selected.id}>
      <Card
        elevation={2}
        sx={{ marginTop: "20px", border: 5, borderColor: "secondary.main" }}
      >
        <CardContent sx={{ backgroundColor: "lightBlue" }}>
          <Typography textAlign="center" variant="h5">
            CONFIRMED MATCH!
          </Typography>

          <Typography textAlign="center" variant="h5">
            {props.selected.name}
          </Typography>
        </CardContent>
        <CardMedia
          sx={{ borderTop: 5, borderBottom: 5, borderColor: "secondary.main" }}
          component="img"
          image={props.selected.image}
          alt="matched writer"
        />
        <CardContent>
          <Typography variant="body1" textAlign="center">
            {props.selected.bio}
          </Typography>
          <br />
          <Typography variant="body2" textAlign="center" fontStyle="italic">
            Work in Progress:
          </Typography>
          <Typography variant="body2" textAlign="center">
            {props.selected.wip}
          </Typography>
          <br />
          <Typography variant="body2" textAlign="center" fontStyle="italic">
            Genres:
          </Typography>
          <Typography variant="body2" textAlign="center">
            {props.selected.genres}
          </Typography>
          <br />
          <Typography variant="body2" textAlign="center" fontStyle="italic">
            What I'm Looking For:
          </Typography>
          <Typography variant="body2" textAlign="center">
            {lookingFor}
          </Typography>
          <br />
          <Typography variant="body2" textAlign="center" fontStyle="italic">
            What I Am Available For:
          </Typography>
          <Typography variant="body2" textAlign="center">
            {availableFor}
          </Typography>
        </CardContent>
        <CardContent>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={8} paddingLeft="20px">
              <ContactMatchButton selected={props.selected} />
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </CardContent>

        <CardContent>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={8} paddingLeft="25px">
              <Button
                variant="contained"
                color="secondary"
                onClick={deleteSelected}
              >
                Remove this Match
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  ) : (
    <Grid item key={props.selected.id}>
      <Card
        elevation={2}
        sx={{ marginTop: "20px", border: 5, borderColor: "secondary.main" }}
      >
        <CardContent sx={{ backgroundColor: "lightBlue" }}>
          <Typography textAlign="center" variant="h5">
            AWAITING CONFIRMATION
          </Typography>

          <Typography textAlign="center" variant="h5">
            {props.selected.name}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          image={props.selected.image}
          alt="matched writer"
          sx={{ borderTop: 5, borderBottom: 5, borderColor: "secondary.main" }}
        />
        <CardContent>
          <Typography variant="body1" textAlign="center">
            {props.selected.bio}
          </Typography>
          <br />
          <Typography variant="body2" textAlign="center" fontStyle="italic">
            Work in Progress:
          </Typography>
          <Typography variant="body2" textAlign="center">
            {props.selected.wip}
          </Typography>
          <br />
          <Typography variant="body2" textAlign="center" fontStyle="italic">
            Genres:
          </Typography>
          <Typography variant="body2" textAlign="center">
            {props.selected.genres}
          </Typography>
          <br />
          <Typography variant="body2" textAlign="center" fontStyle="italic">
            What I'm Looking For:
          </Typography>
          <Typography variant="body2" textAlign="center">
            {lookingFor}
          </Typography>
          <br />
          <Typography variant="body2" textAlign="center" fontStyle="italic">
            What I Am Available For:
          </Typography>
          <Typography variant="body2" textAlign="center">
            {availableFor}
          </Typography>
        </CardContent>
        <CardContent>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={8} paddingLeft="25px">
              <Button
                variant="contained"
                color="secondary"
                onClick={deleteSelected}
              >
                Remove this Match
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default SelectedMatchesItem;
