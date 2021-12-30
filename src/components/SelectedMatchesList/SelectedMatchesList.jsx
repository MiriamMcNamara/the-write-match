import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SelectedMatchesItem from '../SelectedMatchesItem/SelectedMatchesItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


function SelectedMatchesList(props) {

  const selected = useSelector((store) => store.selected);
  const writer = useSelector((store) => store.writer);
  const user = useSelector((store) => store.user);
  const seeking = useSelector((store) => store.seeking);
  const availablefor = useSelector((store) => store.availablefor);
  const dispatch = useDispatch();
  const [heading, setHeading] = useState('Current Matches');

  // useEffect(() => {
  //   // dispatch({ type: "FETCH_SELECTED", payload: writer[0].id });
   
  // }, []);

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
      {selected.map((selected) => (
      <SelectedMatchesItem selected={selected} />
    ))}
    </Grid>
    </Grid>
  </Container>
  )
}

export default SelectedMatchesList;
