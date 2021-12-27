import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, CardMedia, Card, CardContent, Typography, Button } from '@mui/material';

function SelectedMatchesItem(props) {
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState("Current Match!");
  const dispatch = useDispatch();

  const deleteSelected = () => {
    console.log(" in deleteSelected");
    dispatch({
      type: "DELETE_SELECTED",
      payload: props.selected.matches_id,
    });
  };

  return (
  props.selected.confirmed ? (
    <Grid item key={props.selected.id}>
      <Card elevation={2}>
        <CardContent>
        <Typography variant="h4">{heading}</Typography>
        <br />
        <Typography variant="h5">{props.selected.name}</Typography>
        </CardContent>
        <CardMedia
        component="img"
        image={props.selected.image}
        alt="matched writer"
      />
        <CardContent>
        <Typography variant="body1">{props.selected.bio}</Typography>
        <br />
        <Typography variant="body2">Work in Progress: {props.selected.wip}</Typography>
        <br />
        <Typography variant="body2">Genres: {props.selected.genres}</Typography>
        </CardContent>
        <Button variant="outlined">
        Contact This Writer!
        </Button>
      </Card>
      </Grid>
      ) : (

      <Grid item key={props.selected.id}>
      <Card elevation={2}>
        <CardContent>
        <Typography variant="h4">{heading}</Typography>
        <br />
        <Typography variant="h5">{props.selected.name}</Typography>
        </CardContent>
        <CardMedia
        component="img"
        image={props.selected.image}
        alt="matched writer"
      />
        <CardContent>
        <Typography variant="body1">{props.selected.bio}</Typography>
        <br />
        <Typography variant="body2">Work in Progress: {props.selected.wip}</Typography>
        <br />
        <Typography variant="body2">Genres: {props.selected.genres}</Typography>
        </CardContent>
        <Button variant="outlined" onClick={deleteSelected}>
        Pass on This Writer
        </Button>
      </Card>
      </Grid>
      )

  );
}

export default SelectedMatchesItem;
