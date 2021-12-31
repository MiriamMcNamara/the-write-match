import React from 'react';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <Container>

      <RegisterForm />

      <Grid container padding="20px">
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
        <Button 
          variant="contained"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>

    </Container>
  );
}

export default RegisterPage;
