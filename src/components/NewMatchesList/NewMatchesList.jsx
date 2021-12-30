import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewMatchesItem from "../NewMatchesItem/NewMatchesItem";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function NewMatchesList(props) {
  const dispatch = useDispatch();
  const writer = useSelector((store) => store.writer);
  const user = useSelector((store) => store.user);
  const availablefor = useSelector((store) => store.availablefor);
  const seeking = useSelector((store) => store.seeking);
  const matches = useSelector((store) => store.matches);
  const selected = useSelector((store) => store.selected);

  const [heading, setHeading] = useState("New Matches!");

  useEffect(() => {
    dispatch({
      type: "FILTER_MATCHES",
      payload: {
        writer: writer[0].id,
        seeking: seeking[0].seeking_id,
        availablefor: availablefor[0].available_for_id,
        user: user.id,
      },
    });
    dispatch({ type: "FETCH_WRITER", payload: user.id });
    dispatch({ type: "FETCH_SEEKING", payload: user.id });
    dispatch({ type: "FETCH_AVAILABLE_FOR", payload: user.id });
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" color="primary" textAlign="center">{heading}</Typography>
        {matches.map((match) => (
        <NewMatchesItem match={match} />
      ))}
      </Grid>
      </Grid>
    </Container>
  );
}

export default NewMatchesList;
