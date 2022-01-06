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
  const [heading, setHeading] = useState('You Have Current Matches!');

  // useEffect(() => {
  //   // dispatch({ type: "FETCH_SELECTED", payload: writer[0].id });
   
  // }, []);

  useEffect(() => {
    dispatch({ type: "FETCH_WRITER", payload: user.id });
    dispatch({ type: "FETCH_SEEKING", payload: user.id });
    dispatch({ type: "FETCH_AVAILABLE_FOR", payload: user.id });
    dispatch({
      type: "FILTER_MATCHES",
      payload: {
        writer: writer[0].id,
        seeking: seeking[0].seeking_id,
        availablefor: availablefor[0].available_for_id,
        user: user.id,
      },
    });
  }, []);


  return selected.length===0? (
    <Container>
    <Grid item>
      <Typography>{writer[0].name}, you have no current matches. Otherwise, return
      to the New Matches page to see new potential matches!</Typography>
    </Grid>
    </Container>
  ) : (

    <Container>
    <Grid container spacing={3}>
    <Grid item xs={12}>
      <Typography variant="h5" fontStyle="italic" textAlign="center">🎉 {heading} 🎉</Typography>
      {selected.map((selected) => (
      <SelectedMatchesItem selected={selected} />
    ))}
    </Grid>
    </Grid>
  </Container>
  )
}

export default SelectedMatchesList;
