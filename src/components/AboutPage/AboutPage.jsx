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
      <img src='/images/iwritebooks.JPG' alt="Miriam, creator of The Write Match" />
      </Grid>
      <Grid item>
      <br />
      <Typography variant="h6" color="primary" textAlign="center">Hello! It's me, Miriam.</Typography>
        <Typography>I'm a young adult fiction writer who moved from Asheville, NC to Minneapolis, MN a few
          years ago, and lost a wonderful weekly critique group and local writing community in the process. I struggled to connect with other writers in my new home,
          and often wished there was an easy way to find them. But I doggedly volunteered at literary events and
          went to book signings and meet-ups, and eventually I made some wonderful connections.</Typography>
          <br />
          <Typography>Then covid and lockdown hit, and I, like so many other writers, was once again scrambling to find new ways to
      build community and meet new, like-minded creatives. I thought: wouldn't it be wonderful if there had been an app 
      like Tindr that matched creatives with each other based on common goals, and similar interests and mediums?
      That's where the idea for 'The Write Match' was born!</Typography>
      <br />
      <Typography>'The Write Match' aims to help connect writers based on what they are looking for and what they have to offer each other. 
          </Typography>
          <br/>
          <Typography variant="h6" color="primary" textAlign="center">How to use The Write Match:</Typography>
          <br/>
          <Typography>When you register, you will be directed to create a profile. You can then match with other writers based
          on the information you provide for critique, accountability, socializing or strategizing.
           Happy Matching!</Typography>
           <Typography variant="h6" color="primary" textAlign="center">Tech Used:</Typography>
          <br/>
          <Typography></Typography><br />
           <br/>
          <Typography variant="h6" color="primary" textAlign="center">My toughest challenge building this app:</Typography>
          <br/>
          <Typography></Typography><br />
          <Typography variant="h6" color="primary" textAlign="center">My next steps:</Typography>
          <br/>
          <Typography></Typography><br />
          <Typography variant="h6" color="primary" textAlign="center">Thank you to:</Typography>
          <Typography></Typography><br />
      </Grid>
    </Grid>
    </Container>
  );
}

export default AboutPage;
