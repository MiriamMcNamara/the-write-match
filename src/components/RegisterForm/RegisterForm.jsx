import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
    history.push( '/createprofile' );
  }; // end registerUser

  return (
    <Grid container padding="10px" backgroundColor="lightblue" sx={{ border: 5, borderColor: "secondary.main" }}>
    <form onSubmit={registerUser}>
    <Grid item xs={12} >
    <Typography variant="h4" fontStyle="italic">Register User</Typography>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      </Grid>
      <Grid item xs={12} >
        <label htmlFor="username"><Typography margin="10px">
          Create a Username:
          </Typography><TextField
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </Grid>
      <Grid item >
        <label htmlFor="password"><Typography margin="10px">
          Create a Password:
          </Typography><TextField
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </Grid>
      <Grid item paddingTop="10px">
        <input className="btn" type="submit" name="submit" value="REGISTER" />
      </Grid>
    </form>
    </Grid>
  );
}

export default RegisterForm;
