import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewMatchesItem from "../NewMatchesItem/NewMatchesItem";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

//this component maps through the matches reducer, creates a
//NewMatchesItem for each matches object, and sends the object
//to the item via props

function NewMatchesList(props) {
  const dispatch = useDispatch();
  const writer = useSelector((store) => store.writer);
  const user = useSelector((store) => store.user);
  const availablefor = useSelector((store) => store.availablefor);
  const seeking = useSelector((store) => store.seeking);
  const matches = useSelector((store) => store.matches);

  const [heading, setHeading] = useState("You Have New Matches!");

  useEffect(() => {
    //don't think I need these here but not ready to delete them yet
    dispatch({ type: "FETCH_WRITER", payload: user.id });
    dispatch({ type: "FETCH_SEEKING", payload: user.id });
    dispatch({ type: "FETCH_AVAILABLE_FOR", payload: user.id });
    dispatch({
      //this dispatch triggers a Saga that gets all the potential matches
      //for the user and compares them with the matches that already exist.
      //if a match already exists that is either confirmed or was initiated already
      //by the user, that match will be removed from the potential matches
      //before they are sent to the matches.reducter, and thus not be displayed on this page
      type: "FILTER_MATCHES",
      payload: {
        writer: writer[0].id,
        seeking: seeking[0].seeking_id,
        availablefor: availablefor[0].available_for_id,
        user: user.id,
      },
    });
  }, []);

  //conditional rendering in this component dependent on whether the matches
  //reducer is empty or not

  return matches.length === 0 ? (
    <Container>
      <Grid item>
        <Typography>
          {writer[0].name}, you have no new matches. Check out the Current
          Matches page to see the status of your current matches!
        </Typography>
      </Grid>
    </Container>
  ) : (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            paddingTop="10px"
            paddingBottom="10px"
            variant="h5"
            fontStyle="italic"
            textAlign="center"
          >
            🎉 {heading} 🎉
          </Typography>
          {matches.map((match) => (
            <NewMatchesItem match={match} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default NewMatchesList;
