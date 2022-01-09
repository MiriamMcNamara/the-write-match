import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//this component creates an item for each match that the SelectedMatchesList
//pulls from the selected reducer and displays it on the DOM.
//It has conditional rendering depending on whether the match is confirmed
//or awaiting confirmation.

function SelectedMatchesItem(props) {
  const writer = useSelector((store) => store.writer);
  const user = useSelector((store) => store.user);
  const seeking = useSelector((store) => store.seeking);
  const availablefor = useSelector((store) => store.availablefor);
  const dispatch = useDispatch();

  //the user can delete a selected match that is confirmed or awaiting
  //confirmation. We need to send all of this info in the payload because this
  //dispatch triggers the 'FILTER_MATCHES' saga to run again.
  const deleteSelected = () => {
    dispatch({
      type: "DELETE_SELECTED",
      payload: {
        match: props.selected.matches_id,
        writer: writer[0].id,
        seeking: seeking[0].seeking_id,
        availablefor: availablefor[0].available_for_id,
        user: user.id,
      },
    });
    window.scrollTo(0, 0);
  };

  //the next three hooks are related to the modal that pops up when the user clicks
  //'Contact This Writer!'
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return props.selected.confirmed ? (
    <Grid item key={props.selected.id}>
      <Card
        elevation={2}
        sx={{ marginTop: "20px", border: 5, borderColor: "secondary.main" }}
      >
        <CardContent sx={{ backgroundColor: "lightBlue" }}>
          <Typography textAlign="center" variant="h5">
            CONFIRMED MATCH!
          </Typography>

          <Typography textAlign="center" variant="h5">
            {props.selected.name}
          </Typography>
        </CardContent>
        <CardMedia
          sx={{ borderTop: 5, borderBottom: 5, borderColor: "secondary.main" }}
          component="img"
          image={props.selected.image}
          alt="matched writer"
        />
        <CardContent>
          <Typography variant="body1" textAlign="center">
            {props.selected.bio}
          </Typography>
          <br />
          <Typography variant="body2" textAlign="center" fontStyle="italic">
            Work in Progress:
          </Typography>
          <Typography variant="body2" textAlign="center">
            {props.selected.wip}
          </Typography>
          <br />
          <Typography variant="body2" textAlign="center" fontStyle="italic">
            Genres:
          </Typography>
          <Typography variant="body2" textAlign="center">
            {props.selected.genres}
          </Typography>
        </CardContent>
        <CardContent>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={8} paddingLeft="20px">
              <Button
                variant="contained"
                color="secondary"
                gutterBottom
                onClick={handleClickOpen}
              >
                Contact This Writer!
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </CardContent>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" textAlign="center">
            {"Congrats on matching with another awesome creative!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText textAlign="center" id="alert-dialog-description">
              Here's how {props.selected.name} would like for you to get in
              touch:
              <br />
              <br />
              <Typography textAlign="center" variant="h6" fontStyle="italic">
                "{props.selected.contact}"
              </Typography>
              <br />
              We recommend referencing The Write Match in your conversation,
              email or DM title/intro so they know it's you.
              <br />
              <br />
              <Typography textAlign="center" variant="h5" fontStyle="italic">
                🎉 Happy Connecting! 🎉
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <CardContent>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={8} paddingLeft="25px">
              <Button
                variant="contained"
                color="secondary"
                onClick={deleteSelected}
              >
                Remove this Match
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  ) : (
    <Grid item key={props.selected.id}>
      <Card
        elevation={2}
        sx={{ marginTop: "20px", border: 5, borderColor: "secondary.main" }}
      >
        <CardContent sx={{ backgroundColor: "lightBlue" }}>
          <Typography textAlign="center" variant="h5">
            AWAITING CONFIRMATION
          </Typography>

          <Typography textAlign="center" variant="h5">
            {props.selected.name}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          image={props.selected.image}
          alt="matched writer"
          sx={{ borderTop: 5, borderBottom: 5, borderColor: "secondary.main" }}
        />
        <CardContent>
          <Typography variant="body1" textAlign="center">
            {props.selected.bio}
          </Typography>
          <br />
          <Typography variant="body2" textAlign="center" fontStyle="italic">
            Work in Progress:
          </Typography>
          <Typography variant="body2" textAlign="center">
            {props.selected.wip}
          </Typography>
          <br />
          <Typography variant="body2" textAlign="center" fontStyle="italic">
            Genres:
          </Typography>
          <Typography variant="body2" textAlign="center">
            {props.selected.genres}
          </Typography>
        </CardContent>
        <CardContent>
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={8} paddingLeft="25px">
              <Button
                variant="contained"
                color="secondary"
                onClick={deleteSelected}
              >
                Remove this Match
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default SelectedMatchesItem;
