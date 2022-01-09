import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectedMatchesItem from "../SelectedMatchesItem/SelectedMatchesItem";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//this component maps through the selected reducer, creates a
//SelectedMatchesItem for each matches object, and sends the object
//to the item via props

function SelectedMatchesList(props) {
  const selected = useSelector((store) => store.selected);
  const writer = useSelector((store) => store.writer);
  const user = useSelector((store) => store.user);
  const seeking = useSelector((store) => store.seeking);
  const availablefor = useSelector((store) => store.availablefor);
  const dispatch = useDispatch();
  const [heading, setHeading] = useState("You Have Current Matches!");

  useEffect(() => {
    //I don't think I need these, but not ready to delete yet
    // dispatch({ type: "FETCH_WRITER", payload: user.id });
    // dispatch({ type: "FETCH_SEEKING", payload: user.id });
    // dispatch({ type: "FETCH_AVAILABLE_FOR", payload: user.id });
    dispatch({
      //this dispatch triggers a Saga that gets all the potential matches and selected matches
      //for the user. The filtering is used for the NewMatchesList, but the GET route for the
      //selected reducer is within in this dispatch/route sequence
      type: "FILTER_MATCHES",
      payload: {
        writer: writer[0].id,
        seeking: seeking[0].seeking_id,
        availablefor: availablefor[0].available_for_id,
        user: user.id,
      },
    });
  }, []);

  //conditional rendering in this component depending on whether the selected
  //reducer is empty or not
  return selected.length === 0 ? (
    <Container>
      <Grid item>
        <Typography>
          {writer[0].name}, you have no current matches. Check out the New
          Matches page to see new potential matches!
        </Typography>
      </Grid>
    </Container>
  ) : (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" fontStyle="italic" textAlign="center">
            🎉 {heading} 🎉
          </Typography>
          {selected.map((selected) => (
            <SelectedMatchesItem selected={selected} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default SelectedMatchesList;
