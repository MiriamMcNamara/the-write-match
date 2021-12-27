import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, CardMedia, Card, CardContent, Typography, Button } from '@mui/material';

function NewMatchesItem(props) {
  const writer = useSelector((store) => store.writer);
  const dispatch = useDispatch();
  const [heading, setHeading] = useState("NewMatch!");

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
      },
    });
  };

  const removeMatch = () => {
    console.log("in removeMatch");
    //send a dispatch that removes the selected match from the store and the DOM, shouldn't be too hard
    // although it won't last through a page refresh probably
    dispatch({
      type: "REMOVE_MATCH",
      payload: props.match.id
    }); //something wrong with this dispatch, or at least it triggers a matches.map error
    //that i need to get to the bottom of
  };

  return (
      <Grid item>
      <Card elevation={2}>
        <CardContent>
        <Typography variant="h4">{heading}</Typography>
        <br />
        <Typography variant="h5">{props.match.name}</Typography>
        </CardContent>
        <CardMedia
        component="img"
        image={props.match.image}
        alt="matched writer"
      />
        <CardContent>
        <Typography variant="body1">{props.match.bio}</Typography>
        <br />
        <Typography variant="body2">Work in Progress: {props.match.wip}</Typography>
        <br />
        <Typography variant="body2">Genres: {props.match.genres}</Typography>
        </CardContent>
        <Button variant="outlined" onClick={checkForMatch}>
        Match With This Writer!
        </Button>
        <Button variant="outlined" onClick={removeMatch}>
        Pass on This Writer
        </Button>
      </Card>
      </Grid>


  );
}

export default NewMatchesItem;
