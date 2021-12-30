import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function SelectedMatchesItem(props) {
  const selected = useSelector((store) => store.selected);
  const writer = useSelector((store) => store.writer);
  const user = useSelector((store) => store.user);
  const seeking = useSelector((store) => store.seeking);
  const availablefor = useSelector((store) => store.availablefor);
  const [heading, setHeading] = useState("Current Match!");
  const dispatch = useDispatch();

  const deleteSelected = () => {
    console.log(" in deleteSelected");
    dispatch({
      type: "DELETE_SELECTED",
      payload: {
      match: props.selected.matches_id,
      writer: writer[0].id,
        seeking: seeking[0].seeking_id,
        availablefor: availablefor[0].available_for_id,
        user: user.id
      }
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
  props.selected.confirmed ? (
    <Grid item key={props.selected.id}>
    <Card elevation={2} sx={{marginTop: "20px"}}>
      <CardContent>
      <Typography variant="h4">{heading}</Typography>
      <br />
      <Typography variant="h5">CONFIRMED MATCH!</Typography>
      <Typography variant="h5">{props.selected.name}</Typography>
      </CardContent>
      <CardMedia
      sx={{ border: 5, borderColor: "secondary.main" }}
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
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
  Contact This Writer!
  </Button>
  <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Congrats on matching with another awesome creative!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Here's how {props.selected.name} would like for you to get in touch:
            <br />
            <Typography variant="h6">{props.selected.contact}</Typography>
            We recommend referencing The Write Match in your conversation, email or DM
            title/intro so they know it's you.
            <Typography variant="h5">Happy Connecting!</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

  <Button variant="outlined" onClick={deleteSelected}>
      Remove this Match
      </Button>
    </Card>
    </Grid>
      ) : (
<Grid item key={props.selected.id}>
<Card elevation={2} sx={{marginTop: "20px"}}>
  <CardContent>
  <Typography variant="h4">{heading}</Typography>
  <br />
  <Typography variant="h5">AWAITING CONFIRMATION</Typography>
  <Typography variant="h5">{props.selected.name}</Typography>
  </CardContent>
  <CardMedia
  component="img"
  image={props.selected.image}
  alt="matched writer"
  sx={{ border: 5, borderColor: "secondary.main" }}
/>
  <CardContent>
  <Typography variant="body1">{props.selected.bio}</Typography>
  <br />
  <Typography variant="body2">Work in Progress: {props.selected.wip}</Typography>
  <br />
  <Typography variant="body2">Genres: {props.selected.genres}</Typography>
  </CardContent>
  <Button variant="outlined" onClick={deleteSelected}>
      Remove this Match
      </Button>
</Card>
</Grid>
      )

  );
}

export default SelectedMatchesItem;
