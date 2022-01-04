import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


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
  };

  return (
      <Grid item key={props.match.id}>
      <Card elevation={2} sx={{marginTop: "20px", border: 5, borderColor: "secondary.main" }}>
        <CardContent sx={{ backgroundColor: 'lightBlue' }}>
        <Typography textAlign="center" variant="h4" fontStyle="italic">{props.match.name}</Typography>
        </CardContent>
        <CardMedia sx={{ borderTop: 5, borderBottom: 5, borderColor: "secondary.main" }}
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
        <CardContent>
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={8} >
        <Button variant="outlined" onClick={checkForMatch}>
        Match With This Writer!
        </Button>
        </Grid>
        <Grid item xs={2}></Grid>
        </Grid>
        </CardContent>
      </Card>
      </Grid>


  );
}

export default NewMatchesItem;
