import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

  const dispatch = useDispatch();

  const [addEmail, setAddEmail] = useState({
    emailContent: "",
    emailAddress: props.selected.contact,
  });

  //onClick, send addText, props.selected.contact in a dispatch to new saga?

  const sendEmail = () => {
    dispatch({ type: "SEND_EMAIL", payload: addEmail });
    setOpen(false);
  };

  const handleText = (event) => {
    //input capture
    setAddEmail({ ...addEmail, emailContent: event.target.value });
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
            <Typography variant="body2">
              Type a message for {props.selected.name} below. We will send the
              message directly to their email.
            </Typography>
            <br />
            <TextField
              multiline
              rows={4}
              fullWidth
              onChange={(event) => handleText(event)}
            ></TextField>
            <br />
            <br />
            <Typography variant="body2" fontStyle="italic">
              We recommend referencing The Write Match in your email so they
              know it's you. If you would like to take the convo outside of The
              Write Match, feel free to send along your contact info. Otherwise,
              you can both now send emails to each other via The Write Match by
              clicking the "Contact This Writer!" button at any time while
              keeping your contact informatin private!
            </Typography>
            <br />
            <Typography textAlign="center" variant="h5" fontStyle="italic">
              🎉 Happy Connecting! 🎉
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={sendEmail}
            autoFocus
            color="primary"
            variant="contained"
          >
            Send Email
          </Button>
          <Button onClick={handleClose} autoFocus variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default ContactMatchButton;
