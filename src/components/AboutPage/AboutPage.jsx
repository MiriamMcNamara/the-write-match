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
      <Grid item>

      <img src='.../public/images/iwritebooks.JPG' />
      <br />
        <Typography>Hello! I am a young adult fiction writer who moved from Asheville, NC to Minneapolis, MN a few
          years ago. I lost a wonderful writing critique group in the process--this was before covid,
          so Zoom was like not even a thing back then--and struggled to connect other writers once I had
          moved. 'The Write Match' aims to help connect writers based on common goals and useful skills. 
          </Typography>
          <br/>
          <Typography variant="h6">How to use The Write Match</Typography>
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
