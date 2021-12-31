import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

function LoginPage() {
  const history = useHistory();

  return (
    <Container>
      <LoginForm />

      <Grid container padding="20px">
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
        <Button 
          variant="contained"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Container>
  );
}

export default LoginPage;
