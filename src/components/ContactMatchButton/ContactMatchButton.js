import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ContactMatchButton(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState("Email Modal");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        gutterBottom
        onClick={handleClickOpen}
      >
        Contact This Writer!
      </Button>
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
            Here's how {props.selected.name} would like for you to get in touch:
            <br />
            <br />
            <Typography textAlign="center" variant="h6" fontStyle="italic">
              "{props.selected.contact}"
            </Typography>
            <br />
            We recommend referencing The Write Match in your conversation, email
            or DM title/intro so they know it's you.
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
    </div>
  );
}

export default ContactMatchButton;
