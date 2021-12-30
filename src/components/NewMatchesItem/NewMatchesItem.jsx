import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, CardMedia, Card, CardContent, Typography, Button } from '@mui/material';

function NewMatchesItem(props) {
  const writer = useSelector((store) => store.writer);
  const user = useSelector((store) => store.user);
  const availablefor = useSelector((store) => store.availablefor);
  const seeking = useSelector((store) => store.seeking);
  const matches = useSelector((store) => store.matches);
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
        writer: writer[0].id,
        seeking: seeking[0].seeking_id,
        availablefor: availablefor[0].available_for_id,
        user: user.id
      },
    });
    // dispatch({
    //   type: "REMOVE_MATCH",
    //   payload: props.match.id
    // }); 
  };

  // const removeMatch = () => {
  //   console.log("in removeMatch");
  //   //send a dispatch that removes the selected match from the store and the DOM, shouldn't be too hard
  //   // although it won't last through a page refresh probably
  //   dispatch({
  //     type: "REMOVE_MATCH",
  //     payload: props.match.id
  //   }); 
  // };

  return (
      <Grid item key={props.match.id}>
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
        {/* <Button variant="outlined" onClick={removeMatch}>
        Pass on This Writer
        </Button> */}
      </Card>
      </Grid>


  );
}

export default NewMatchesItem;
