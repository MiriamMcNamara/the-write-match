import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ContactMatchButton(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState("Email Modal");

  const [addText, setAddText] = useState("");

  const handleText = (event) => {
    //input capture
    setAddText(event.target.value);
    console.log("setAddText:", event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          gutterBottom
          onClick={handleClickOpen}
        >
          Contact This Writer!
        </Button>
      </Grid>
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
            Type a message for {props.selected.name} below. We will send the
            message directly to their email.
            <br />
            <br />
            <TextField
              multiline
              rows={4}
              fullWidth
              onChange={(event) => handleText(event)}
            ></TextField>
            <br />
            We recommend referencing The Write Match in your email so they know
            it's you. If you would like to take the convo outside of The Write
            Match, feel free to send your contact info in the email. Otherwise,
            you can both now send emails to each other via The Write Match by
            clicking the "Contact This Writer!" button at any time.
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
    </Grid>
  );
}

export default ContactMatchButton;
