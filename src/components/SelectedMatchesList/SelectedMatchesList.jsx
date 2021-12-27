import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SelectedMatchesItem from '../SelectedMatchesItem/SelectedMatchesItem';
import { Container, Grid, Typography } from '@mui/material';


function SelectedMatchesList(props) {

  const selected = useSelector((store) => store.selected);
  const dispatch = useDispatch();
  const [heading, setHeading] = useState('Current Matches');


  return (

    <Container>
    <Grid container spacing={3}>
      <Typography variant="h3" color="primary">{heading}</Typography>
      {selected.map((selected) => (
      <SelectedMatchesItem selected={selected} />
    ))}
    </Grid>
  </Container>
  )
}

export default SelectedMatchesList;
