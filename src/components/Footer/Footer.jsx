import React from "react";
import "./Footer.css";
import Typography from "@mui/material/Typography";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.

function Footer() {
  return (
    <Typography color="primary" textAlign="center" padding="20px">
      &copy; Miriam McNamara
    </Typography>
  );
}

export default Footer;
