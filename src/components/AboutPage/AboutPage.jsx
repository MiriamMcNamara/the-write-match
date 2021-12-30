import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
 
  return (
    <Container>
    <Grid container>
      <Grid item sx={{ border: 5, borderColor: "secondary.main" }}>
      <img src='/images/iwritebooks.JPG' alt="creator of The Write Match" />
      </Grid>
      <Grid item>
      <br />
        <Typography>Hello! I'm the creator of The Write Match. I'm a young adult fiction writer who moved from Asheville, NC to Minneapolis, MN a few
          years ago, and lost a wonderful writing critique group in the process. This was before covid,
          so Zoom was not even a thing back then! I struggled to connect other writers in my new home,
          and often wished there was an easy way to find them. 'The Write Match' aims to help connect writers based on common goals and useful skills. 
          </Typography>
          <br/>
          <Typography variant="h6" color="primary" textAlign="center">How to use The Write Match:</Typography>
          <br/>
          <Typography>When you register, you will be directed to create a profile. You can then match with other writers based
          on the information you provide for critique, accountability, socializing or strategizing.
           Happy Matching!</Typography>

      </Grid>
    </Grid>
    </Container>
  );
}

export default AboutPage;
